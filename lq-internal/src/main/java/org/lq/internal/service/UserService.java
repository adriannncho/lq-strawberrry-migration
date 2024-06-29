package org.lq.internal.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import org.lq.internal.domain.user.LoginDTO;
import org.lq.internal.domain.user.User;
import org.lq.internal.domain.user.UserDTO;
import org.lq.internal.helper.exception.PVException;
import org.lq.internal.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.wildfly.security.password.Password;
import org.wildfly.security.password.PasswordFactory;
import org.wildfly.security.password.interfaces.BCryptPassword;
import org.wildfly.security.password.spec.ClearPasswordSpec;

import java.util.List;

@ApplicationScoped
public class UserService {

    private final Logger LOG = Logger.getLogger(ProductService.class);

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

    private void validateUser(List<User> users) {
        if (users.isEmpty()) {
            LOG.warnf("@getUsers SERV > No users found");
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "No se encontraron usuarios");
        }
    }

    public void validateLogin(LoginDTO loginDTO) throws PVException {
        LOG.infof("@validateLogin SERV > Start service to validate the user");

        User user = userRepository.findByDocumentNumber(loginDTO.getDocument());
        if (user == null) {
            LOG.warnf("@validateLogin SERV > No user found");
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "No se encontró usuario con el número de documento ingresado.");
        }

        if (!checkPassword(loginDTO.getPassword(), user.getPassword())) {
            LOG.warnf("@validateLogin SERV > Incorrect password");
            throw new PVException(Response.Status.UNAUTHORIZED.getStatusCode(), "Contraseña incorrecta.");
        }

        LOG.infof("@validateLogin SERV > Finish service to validate the user");
    }

    public void saveUser(UserDTO userDTO) throws PVException {
        LOG.infof("@saveUser SERV > Start service to save a new user");

        if (userRepository.findByDocumentNumber(userDTO.getDocumentNumber()) != null) {
            LOG.warnf("@saveUser SERV > User already exists with document number %s", userDTO.getDocumentNumber());
            throw new PVException(Response.Status.CONFLICT.getStatusCode(), "El usuario ya existe.");
        }

        String encryptedPassword = encryptPassword(userDTO.getPassword());

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
                .password(encryptedPassword)
                .build();

        LOG.infof("@saveUser SERV > Persisting user with document number %s", userDTO.getDocumentNumber());
        userRepository.persist(user);

        LOG.infof("@saveUser SERV > User saved successfully with document number %s", userDTO.getDocumentNumber());
    }

    private String encryptPassword(String password) throws PVException {
        try {
            return BCrypt.hashpw(password, BCrypt.gensalt());
        } catch (Exception e) {
            LOG.errorf("@encryptPassword SERV > Error encrypting password", e);
            throw new PVException(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(), "Error encriptando la contraseña.");
        }
    }

    private boolean checkPassword(String rawPassword, String encryptedPassword) throws PVException {
        try {
            return BCrypt.checkpw(rawPassword, encryptedPassword);
        } catch (Exception e) {
            LOG.errorf("@checkPassword SERV > Error validating password", e);
            throw new PVException(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(), "Error validando la contraseña.");
        }
    }
}
