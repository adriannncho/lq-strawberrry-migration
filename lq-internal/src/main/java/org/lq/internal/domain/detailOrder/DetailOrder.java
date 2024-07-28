package org.lq.internal.domain.detailOrder;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.lq.internal.domain.detailProduct.DetailProduct;
import org.lq.internal.domain.ingredient.DetailAdditional;
import org.lq.internal.domain.product.Product;

import java.io.Serializable;
import java.util.List;

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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_PRODUCTO", referencedColumnName = "ID_PRODUCTO")
    private Product product;

    @Column(name = "CANTIDAD")
    private Long quantity;

    @Column(name = "PRECIO")
    private Long value;

    @Transient
    private List<DetailAdditional> detailAdditionals;
}
