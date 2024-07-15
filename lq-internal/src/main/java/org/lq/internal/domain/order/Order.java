package org.lq.internal.domain.order;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.lq.internal.domain.detailOrder.DetailOrder;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PEDIDO")
public class Order {

    @Id
    @Column(name = "ID_PEDIDO", length = 36)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idOrder;

    @Column(name = "ID_USUARIO")
    private Long idUser;

    @Column(name = "CLIENTE_NOMBRE", length = 36)
    private String nameCustomer;

    @Column(name = "FECHA_HORA")
    private LocalDateTime creationDate;

    @Column(name = "TOTAL")
    private Long total;

    @Transient
    private List<DetailOrder> detailOrders;
}
