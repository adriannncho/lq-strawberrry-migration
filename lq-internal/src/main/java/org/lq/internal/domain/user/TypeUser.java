package org.lq.internal.domain.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Data
@Table(name = "tipo_usuario")
public class TypeUser {

    @Column(name = "id_tipo_usuario")
    private int idTypeUser;

    @Column(name = "nombre")
    private String name;
}
