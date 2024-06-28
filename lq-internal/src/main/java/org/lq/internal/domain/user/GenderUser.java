package org.lq.internal.domain.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "genero")
public class GenderUser {

    @Column(name = "id_genero")
    private int idGender;

    @Column(name = "nombre")
    private String name;
}
