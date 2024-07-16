package org.lq.internal.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import org.lq.internal.domain.detailOrder.DetailOrder;
import org.lq.internal.domain.ingredient.DetailAdditional;
import org.lq.internal.domain.order.Order;
import org.lq.internal.domain.order.OrderDTO;
import org.lq.internal.domain.order.OrderStatus;
import org.lq.internal.helper.exception.PVException;
import org.lq.internal.repository.DetailAdditionalRepository;
import org.lq.internal.repository.DetailOrderRepository;
import org.lq.internal.repository.OrderRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class OrderService {

    private final Logger LOG = Logger.getLogger(ProductService.class);

    @Inject
    OrderRepository orderRepository;

    @Inject
    DetailOrderRepository detailOrderRepository;

    @Inject
    DetailAdditionalRepository detailAdditionalRepository;

    public List<Order> getOrders() throws PVException {
        LOG.infof("@getOrders SERV > Start service to obtain the orders");

        List<Order> orders = orderRepository.listAll();
        LOG.infof("@getOrders SERV > Retrieved list of orders");

        if (orders.isEmpty()) {
            LOG.warnf("@getOrders SERV > No orders found");
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "No se encontraron pedidos");
        }

        for (Order order : orders) {
            LOG.infof("@getOrders SERV > Fetching detail orders for order ID %d", order.getIdOrder());
            List<DetailOrder> detailOrders = detailOrderRepository.list("idOrder", order.getIdOrder());

            for (DetailOrder detailOrder : detailOrders) {
                LOG.infof("@getOrders SERV > Fetched product details for detail order ID %d", detailOrder.getIdDetailOrder());
            }

            order.setDetailOrders(detailOrders);
            LOG.infof("@getOrders SERV > Found %d detail orders for order ID %d", detailOrders.size(), order.getIdOrder());
        }

        LOG.infof("@getOrders SERV > Finish service to obtain the orders");
        return orders;
    }


    public void createOrder(OrderDTO orderDTO){
        LOG.infof("@createOrder SERV > Start service to create the order with data: %s", orderDTO);

        Order order = Order.builder()
                .creationDate(LocalDateTime.now())
                .total(orderDTO.getTotal())
                .nameCustomer(orderDTO.getNameCustomer())
                .idUser(orderDTO.getIdUser())
                .status(OrderStatus.PENDIENTE)
                .build();

        LOG.infof("@createOrder SERV > Persisting order: %s", order);
        orderRepository.persist(order);

        List<DetailOrder> persistedDetailOrders = new ArrayList<>();
        for (DetailOrder detailOrderDTO : orderDTO.getDetailOrders()) {
            DetailOrder detailOrder = DetailOrder.builder()
                    .idOrder(order.getIdOrder())
                    .value(detailOrderDTO.getValue())
                    .quantity(detailOrderDTO.getQuantity())
                    .product(detailOrderDTO.getProduct())
                    .build();

            LOG.infof("@createOrder SERV > Persisting detail order: %s", detailOrder);
            detailOrderRepository.persist(detailOrder);
            persistedDetailOrders.add(detailOrder);
        }

        LOG.infof("@createOrder SERV > Detail orders: %s", persistedDetailOrders);

        if (orderDTO.getDetailAdditionals() != null && !orderDTO.getDetailAdditionals().isEmpty()) {
            for (DetailAdditional detailAdditionalDTO : orderDTO.getDetailAdditionals()) {
                DetailOrder correspondingDetailOrder = persistedDetailOrders.get(0);

                DetailAdditional detailAdditional = DetailAdditional.builder()
                        .idDetailOrder(correspondingDetailOrder.getIdDetailOrder())
                        .idIngredient(detailAdditionalDTO.getIdIngredient())
                        .build();

                LOG.infof("@createOrder SERV > Persisting detail additional: %s", detailAdditional);
                detailAdditionalRepository.persist(detailAdditional);
            }
        }

        LOG.infof("@createOrder SERV > End service to create the order");
    }

    public void updateOrderStatus(long orderId) throws PVException {
        LOG.infof("@updateOrderStatus SERV > Start service to update the status of order ID %d to %s", orderId, OrderStatus.COMPLETADO.toString());

        Order order = orderRepository.findById(orderId);
        if (order == null) {
            LOG.warnf("@updateOrderStatus SERV > Order ID %d not found", orderId);
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "Pedido no encontrado");
        }

        order.setStatus(OrderStatus.COMPLETADO);
        orderRepository.persist(order);

        LOG.infof("@updateOrderStatus SERV > Updated status of order ID %d to %s", orderId, OrderStatus.COMPLETADO.toString());
    }

    public List<Order> ordersPending(){

        List<Order> orderList = orderRepository.findOrdersPending();

        if (orderList.isEmpty()) {
            LOG.warnf("@getOrders SERV > No orders found");
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "No se encontraron pedidos pendientes");
        }

        for (Order order : orderList) {
            LOG.infof("@getOrders SERV > Fetching detail orders for order ID %d", order.getIdOrder());
            List<DetailOrder> detailOrders = detailOrderRepository.list("idOrder", order.getIdOrder());

            for (DetailOrder detailOrder : detailOrders) {
                LOG.infof("@getOrders SERV > Fetched product details for detail order ID %d", detailOrder.getIdDetailOrder());
            }

            order.setDetailOrders(detailOrders);
            LOG.infof("@getOrders SERV > Found %d detail orders for order ID %d", detailOrders.size(), order.getIdOrder());
        }

        LOG.infof("@getOrders SERV > Finish service to obtain the orders");
        return orderList;
    }
}
