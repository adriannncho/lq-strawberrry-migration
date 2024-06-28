package org.lq.internal.domain.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "usuario")
public class User {

    @Id
    @Column(name = "numero_documento")
    private Long documentNumber;

    @Column(name = "id_tipo_usuario")
    private int userTypeId;

    @Column(name = "id_genero")
    private int genderId;

    @Column(name = "id_tipo_documento")
    private int documentTypeId;

    @Column(name = "id_estado_usuario")
    private int userStatusId;

    @Column(name = "nombre_uno")
    private String firstName;

    @Column(name = "nombre_dos")
    private String secondName;

    @Column(name = "apellido_uno")
    private String firstLastName;

    @Column(name = "apellido_dos")
    private String secondLastName;

    @Column(name = "telefono")
    private String phone;

    @Column(name = "direccion")
    private String address;

    @Column(name = "correo")
    private String email;

    @Column(name = "contraseña")
    private String password;

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PrePersist
    @PreUpdate
    private void encryptPassword() {
        this.password = passwordEncoder.encode(this.password);
    }

}
