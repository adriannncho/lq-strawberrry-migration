package org.lq.internal.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.lq.internal.domain.combo.Combo;

import java.util.List;

@ApplicationScoped
public class ComboRepository implements PanacheRepository<Combo> {

    public List<Combo> findComboActive() {
        return list("status", "ACTIVO");
    }
}
