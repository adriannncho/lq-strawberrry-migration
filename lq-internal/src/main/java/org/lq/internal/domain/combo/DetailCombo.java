package org.lq.internal.domain.combo;

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
@Table(name = "DETALLE_COMBO")
public class DetailCombo implements Serializable {

    @Id
    @Column(name = "ID_DETALLE_COMBO", length = 36)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDetailCombo;

    @Column(name = "ID_PRODUCTO", length = 36)
    private int idProduct;
}
