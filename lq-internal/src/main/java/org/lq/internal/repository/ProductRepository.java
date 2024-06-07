package org.lq.internal.repository;

import jakarta.enterprise.context.ApplicationScoped;
import org.lq.internal.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

@ApplicationScoped
public interface ProductRepository extends JpaRepository<Product, String> {

}
