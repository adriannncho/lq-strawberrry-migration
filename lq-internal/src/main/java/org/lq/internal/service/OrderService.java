package org.lq.internal.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import org.lq.internal.domain.detailOrder.DetailOrder;
import org.lq.internal.domain.order.Order;
import org.lq.internal.helper.exception.PVException;
import org.lq.internal.repository.DetailOrderRepository;
import org.lq.internal.repository.OrderRepository;

import java.util.List;

@ApplicationScoped
public class OrderService {

    private final Logger LOG = Logger.getLogger(ProductService.class);

    @Inject
    OrderRepository orderRepository;

    @Inject
    DetailOrderRepository detailOrderRepository;

    public List<Order> getOrders() throws PVException {
        LOG.infof("@getProducts SERV > Start service to obtain the products");

        List<Order> orders = orderRepository.listAll();
        LOG.infof("@getProducts SERV > Retrieved list of products");

        if (orders.isEmpty()) {
            LOG.warnf("@getProducts SERV > No products found");
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "No se encontraron pedidos");
        }

        for (Order order : orders) {
            LOG.infof("@getProducts SERV > Fetching detail products for product ID %d", order.getIdOrder());
            List<DetailOrder> detailOrders = detailOrderRepository.list("idProduct", order.getIdOrder());

            LOG.infof("@getProducts SERV > Found %d detail products for product ID %d", detailOrders.size(), order.getIdOrder());
            order.setDetailOrders(detailOrders);
        }

        LOG.infof("@getProducts SERV > Finish service to obtain the products");
        return orders;
    }
}
