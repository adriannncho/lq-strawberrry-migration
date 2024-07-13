package org.lq.internal.domain.detailOrder;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "DETALLE_PEDIDO")
public class DetailOrder implements Serializable {

    @Id
    @Column(name = "ID_DETALLE_PEDIDO", length = 36)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDetailOrder;

    @Column(name = "ID_PEDIDO", length = 36)
    private int idOrder;

    @Column(name = "ID_PRODUCTO", length = 36)
    private int idProduct;

    @Column(name = "CANTIDAD")
    private Long quantity;

    @Column(name = "PRECIO")
    private Long value;
}
