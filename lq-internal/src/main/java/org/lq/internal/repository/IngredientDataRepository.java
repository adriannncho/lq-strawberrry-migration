package org.lq.internal.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.lq.internal.domain.ingredient.IngredientData;

@ApplicationScoped
public class IngredientDataRepository implements PanacheRepository<IngredientData> {
}
