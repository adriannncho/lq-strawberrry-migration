package org.lq.internal.domain.product;

import jakarta.persistence.PrePersist;

import java.util.UUID;

public class ProductIdListener {

    @PrePersist
    public void generateId(Product product) throws InterruptedException {
        if (product.getPrdLvlNumber() == null) {
            product.setPrdLvlNumber(UUID.randomUUID().toString());
        }
    }

}
