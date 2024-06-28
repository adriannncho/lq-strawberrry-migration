package org.lq.internal.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import org.lq.internal.domain.user.User;
import org.lq.internal.domain.user.UserDTO;
import org.lq.internal.helper.exception.PVException;
import org.lq.internal.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@ApplicationScoped
public class UserService {

    private final Logger LOG = Logger.getLogger(ProductService.class);

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Inject
    UserRepository userRepository;

    public List<User> getUsers() throws PVException {
        LOG.infof("@getUsers SERV > Start service to obtain the users");

        List<User> users = userRepository.listAll();
        LOG.infof("@getUsers SERV > Retrieved list of users");

        validateUser(users);

        LOG.infof("@getUsers SERV > Finish service to obtain the users");
        return users;
    }

    public void validateLogin(long document, String password) throws PVException {
        LOG.infof("@validateLogin SERV > Start service to validate the user");

        User user = userRepository.findByDocumentNumber(document);
        if (user == null) {
            LOG.warnf("@validateLogin SERV > No user found");
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "No se encontró usuario con el número de documento ingresado.");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            LOG.warnf("@validateLogin SERV > Password incorrect");
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "La contraseña es incorrecta.");
        }

        LOG.infof("@validateLogin SERV > Finish service to validate the user");
    }

    private void validateUser (List<User> users){
        if (users.isEmpty()) {
            LOG.warnf("@getUsers SERV > No users found");
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "No se encontraron usuarios");
        }
    }

    public void saveUser(UserDTO userDTO) throws PVException {
        LOG.infof("@saveUser SERV > Start service to save a new user");

        if (userRepository.findByDocumentNumber(userDTO.getDocumentNumber()) != null) {
            LOG.warnf("@saveUser SERV > User already exists with document number %s", userDTO.getDocumentNumber());
            throw new PVException(Response.Status.CONFLICT.getStatusCode(), "El usuario ya existe.");
        }

        LOG.infof("@saveUser SERV > Creating user entity from DTO");
        User user = User.builder()
                .documentNumber(userDTO.getDocumentNumber())
                .userTypeId(userDTO.getUserTypeId())
                .genderId(userDTO.getGenderId())
                .documentTypeId(userDTO.getDocumentTypeId())
                .userStatusId(userDTO.getUserStatusId())
                .firstName(userDTO.getFirstName())
                .secondName(userDTO.getSecondName())
                .firstLastName(userDTO.getFirstLastName())
                .secondLastName(userDTO.getSecondLastName())
                .phone(userDTO.getPhone())
                .address(userDTO.getAddress())
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .build();

        LOG.infof("@saveUser SERV > Persisting user with document number %s", userDTO.getDocumentNumber());
        userRepository.persist(user);

        LOG.infof("@saveUser SERV > User saved successfully with document number %s", userDTO.getDocumentNumber());
    }
}
