package org.lq.internal.domain.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "estado_usuario")
public class StatusUser {

    @Column(name = "id_estado_usuario")
    private int idStatusUser;

    @Column(name = "nombre")
    private String name;
}

