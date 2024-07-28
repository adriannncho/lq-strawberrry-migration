package org.lq.internal.domain.product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.lq.internal.domain.detailProduct.DetailProduct;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PRODUCTO")
public class Product implements Serializable {

    @Id
    @Column(name = "ID_PRODUCTO", length = 36)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idProduct;

    @Column(name = "ID_TAMANIO", length = 36)
    private int size;

    @Column(name = "NOMBRE")
    private String name;

    @Column(name = "DESCRIPCION")
    private String description;

    @Column(name = "PRECIO")
    private Long value;

    @Transient
    private List<DetailProduct> detailProduct;
}
