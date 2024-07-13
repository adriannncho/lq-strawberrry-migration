package org.lq.internal.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.lq.internal.domain.order.Order;

@ApplicationScoped
public class OrderRepository implements PanacheRepository<Order> {

}
