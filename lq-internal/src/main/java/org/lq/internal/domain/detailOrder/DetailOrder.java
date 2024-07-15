package org.lq.internal.domain.detailOrder;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.lq.internal.domain.product.Product;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_PRODUCTO", referencedColumnName = "ID_PRODUCTO")
    private Product product;

    @Column(name = "CANTIDAD")
    private Long quantity;

    @Column(name = "PRECIO")
    private Long value;
}
