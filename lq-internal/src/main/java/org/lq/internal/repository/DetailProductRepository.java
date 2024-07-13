package org.lq.internal.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.lq.internal.domain.detailProduct.DetailProduct;
import org.lq.internal.domain.product.Product;

@ApplicationScoped
public class DetailProductRepository implements PanacheRepository<DetailProduct> {

}
