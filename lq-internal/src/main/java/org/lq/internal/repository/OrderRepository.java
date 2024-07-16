package org.lq.internal.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.lq.internal.domain.order.Order;
import org.lq.internal.domain.order.OrderStatus;

import java.util.List;

@ApplicationScoped
public class OrderRepository implements PanacheRepository<Order> {

        public List<Order> findOrdersPending() {
        return list("status", OrderStatus.PENDIENTE);
    }
}
