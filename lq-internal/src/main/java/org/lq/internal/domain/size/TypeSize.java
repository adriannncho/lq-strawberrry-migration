package org.lq.internal.domain.size;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Table(name = "tipo_tamanio")
public class TypeSize implements Serializable {

    @Id
    @Column(name = "id_tipo_tamanio", length = 36)
    private Long idTipoTamanio;

    @Column(name = "nombre", length = 36)
    private String name;

    @Column(name = "acronimo", length = 36)
    private String abbreviation;
}

