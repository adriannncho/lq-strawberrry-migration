package org.lq.internal.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import org.lq.internal.domain.combo.Combo;
import org.lq.internal.domain.combo.ComboDTO;
import org.lq.internal.domain.combo.DetailCombo;
import org.lq.internal.domain.combo.TypeDiscount;
import org.lq.internal.domain.ingredient.Ingredient;
import org.lq.internal.domain.ingredient.IngredientDTO;
import org.lq.internal.helper.exception.PVException;
import org.lq.internal.repository.ComboRepository;
import org.lq.internal.repository.DetailComboRepository;
import org.lq.internal.repository.TypeDiscountRepository;

import java.util.List;

@ApplicationScoped
public class ComboService {

    private static final Logger LOG = Logger.getLogger(ComboService.class);

    @Inject
    ComboRepository comboRepository;

    @Inject
    DetailComboRepository detailComboRepository;

    @Inject
    TypeDiscountRepository typeDiscountRepository;

    public List<Combo> getCombo() throws PVException {
        LOG.infof("@getCombo SERV > Start service to obtain the combos");

        List<Combo> combos = comboRepository.listAll();
        LOG.infof("@getCombo SERV > Retrieved list of combos");

        if (combos.isEmpty()) {
            LOG.warnf("@getCombo SERV > No combos found");
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "No se encontraron combos");
        }

        for (Combo combo : combos) {
            LOG.infof("@getCombo SERV > Fetching detail combos for combo ID %d", combo.getIdCombo());
            List<DetailCombo> detailCombos = detailComboRepository.list("idDetailCombo", combo.getIdDetailCombo());

            LOG.infof("@getCombo SERV > Found %d detail combos for combo ID %d", detailCombos.size(), combo.getIdCombo());
            combo.setDetailCombos(detailCombos);
        }

        LOG.infof("@getCombo SERV > Finish service to obtain the combos");
        return combos;
    }

    public List<Combo> getComboActive() throws PVException {
        LOG.infof("@getComboActive SERV > Start service to obtain active combos");

        List<Combo> combos = comboRepository.findComboActive();
        LOG.infof("@getComboActive SERV > Retrieved list of active combos");

        if (combos.isEmpty()) {
            LOG.warnf("@getComboActive SERV > No active combos found");
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "No se encontraron combos activos.");
        }

        for (Combo combo : combos) {
            LOG.infof("@getCombo SERV > Fetching detail combos for combo ID %d", combo.getIdCombo());
            List<DetailCombo> detailCombos = detailComboRepository.list("idDetailCombo", combo.getIdDetailCombo());

            LOG.infof("@getCombo SERV > Found %d detail combos for combo ID %d", detailCombos.size(), combo.getIdCombo());
            combo.setDetailCombos(detailCombos);
        }

        LOG.infof("@getComboActive SERV > Finish service to obtain active combos");
        return combos;
    }

    public void saveCombo(ComboDTO comboDTO) throws PVException {
        LOG.infof("@saveCombo SERV > Start service to save a new combo");

        LOG.infof("@saveCombo SERV > Creating TypeDiscount entity from DTO");

        TypeDiscount typeDiscount = TypeDiscount.builder()
                .name(comboDTO.getNameDiscount())
                .build();
        typeDiscountRepository.persist(typeDiscount);

        Combo combo = Combo.builder()
                .idTypeDiscount(typeDiscount.getIdTypeDiscount())
                .value(comboDTO.getValue())
                .description(comboDTO.getDescription())
                .status("ACTIVO")
                .build();

        comboRepository.persist(combo);

        for (DetailCombo detailComboDTO : comboDTO.getDetailCombos()) {
            DetailCombo detailCombo = DetailCombo.builder()
                    .idProduct(detailComboDTO.getIdProduct())
                    .idCombo(combo.getIdCombo())
                    .build();

            detailComboRepository.persist(detailCombo);

            combo.addDetailCombo(detailCombo);
        }

        // Actualizar el combo con los DetailCombos
        comboRepository.persist(combo);

        LOG.infof("@saveCombo SERV > Combo saved successfully with ID %d", combo.getIdCombo());
    }
}
