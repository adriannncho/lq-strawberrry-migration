package org.lq.internal.rest;


import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.media.SchemaProperty;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.lq.internal.domain.user.UserDTO;
import org.lq.internal.helper.exception.HandlerException;
import org.lq.internal.helper.exception.ProblemException;
import org.lq.internal.service.UserService;

@Path("/internal")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserApi {

    @Inject
    UserService userService;

    @GET
    @Path("/users")
    @APIResponses(
            value = {
                    @APIResponse(
                            responseCode = "200",
                            description = "Se obtiene el listado de usuarios correctamente"
                    ),
                    @APIResponse(
                            responseCode = "404",
                            description = "No hay registros de usuarios en base de datos.",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON,
                                    schema = @Schema(
                                            implementation = ProblemException.class,
                                            properties = {
                                                    @SchemaProperty(
                                                            name = "detail",
                                                            example = "No se encontraron registro de usuarios."
                                                    )
                                            }
                                    )
                            )
                    ),
                    @APIResponse(
                            responseCode = "500",
                            description = "Error interno de servidor",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON,
                                    schema = @Schema(implementation = HandlerException.ResponseError.class)
                            )
                    )
            }
    )
    @Operation(
            summary = "Obtener listado de usuarios",
            description = "Se obtiene el listado con la información de los usuarios registrados"
    )
    public Response getProducts(){
        return Response.ok().entity(userService.getUsers()).build();
    }

    @POST
    @Transactional
    @Path("/login")
    @APIResponses(
            value = {
                    @APIResponse(
                            responseCode = "200",
                            description = "Se accede de forma correcta con el usuario y contraseña asignados."
                    ),
                    @APIResponse(
                            responseCode = "404",
                            description = "No hay registros de usuarios en base de datos.",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON,
                                    schema = @Schema(
                                            implementation = ProblemException.class,
                                            properties = {
                                                    @SchemaProperty(
                                                            name = "detail",
                                                            example = "No se encontro el usuario con el que se intenta acceder."
                                                    )
                                            }
                                    )
                            )
                    ),
                    @APIResponse(
                            responseCode = "500",
                            description = "Error interno de servidor",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON,
                                    schema = @Schema(implementation = HandlerException.ResponseError.class)
                            )
                    )
            }
    )
    @Operation(
            summary = "Acceso a la aplicación",
            description = "Se da acceso de forma exitosa a la aplicación"
    )
    public Response validateLogin(
            @QueryParam("document")
            @Parameter(name = "document",
                    required = true,
                    example = "1055332322"
            )
            @NotEmpty(message = "El campo del documento no puede ser nulo ni vacío.")
            long document,
            @QueryParam("password")
            @Parameter(name = "password",
            required = true
            )
            @NotEmpty(message = "El campo de la contraseña no puede ser nulo ni vacío.")
            String password
            ){
        userService.validateLogin(document, password);
        return Response.ok().build();
    }

    @POST
    @Transactional
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    @APIResponses(
            value = {
                    @APIResponse(
                            responseCode = "200",
                            description = "Usuario registrado exitosamente."
                    ),
                    @APIResponse(
                            responseCode = "400",
                            description = "Errores de validación de entrada",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON,
                                    schema = @Schema(
                                            example = """
                                                    {
                                                      
                                                    }"""
                                    )
                            )
                    ),
                    @APIResponse(
                            responseCode = "409",
                            description = "El usuario ya existe.",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON,
                                    schema = @Schema(implementation = ProblemException.class)
                            )
                    ),
                    @APIResponse(
                            responseCode = "500",
                            description = "Error interno de servidor",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON,
                                    schema = @Schema(implementation = HandlerException.ResponseError.class)
                            )
                    )
            }
    )
    @Operation(
            summary = "Registro de usuario",
            description = "Registra un nuevo usuario en la aplicación"
    )
    public Response saveProduct(
            @Valid UserDTO userDTO
    ){
        userService.saveUser(userDTO);
        return Response.status(Response.Status.CREATED).build();
    }
}
