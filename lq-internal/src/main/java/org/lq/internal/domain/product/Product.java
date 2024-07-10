package org.lq.internal.domain.product;

import jakarta.persistence.*;
import lombok.*;
import org.lq.internal.domain.size.Size;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PRODUCTO")
public class Product implements Serializable {

    @Id
    @Column(name = "ID_PRODUCTO", length = 36)
    private int prdLvlNumber;

    @Column(name = "ID_TAMANIO", length = 36)
    private int size;

    @Column(name = "NOMBRE")
    private String name;

    @Column(name = "DESCRIPCION")
    private String description;

    @Column(name = "PRECIO")
    private Long value;
}
