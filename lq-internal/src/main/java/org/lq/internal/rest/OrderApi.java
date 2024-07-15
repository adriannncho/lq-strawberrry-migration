package org.lq.internal.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.media.SchemaProperty;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.lq.internal.domain.order.OrderDTO;
import org.lq.internal.domain.product.ProductDTO;
import org.lq.internal.helper.exception.HandlerException;
import org.lq.internal.helper.exception.ProblemException;
import org.lq.internal.service.OrderService;

@Path("/internal")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class OrderApi {

    @Inject
    OrderService orderService;

    @GET
    @Path("/orders")
    @APIResponses(
            value = {
                    @APIResponse(
                            responseCode = "200",
                            description = "Se obtiene el listado de pedidos correctamente",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON,
                                    schema = @Schema(
                                            type = SchemaType.ARRAY,
                                            example = """
                                                    [
                                                    
                                                    ]"""
                                    )
                            )
                    ),
                    @APIResponse(
                            responseCode = "404",
                            description = "No hay registros de pedidos en base de datos.",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON,
                                    schema = @Schema(
                                            implementation = ProblemException.class,
                                            properties = {
                                                    @SchemaProperty(
                                                            name = "detail",
                                                            example = "No se encontraron registro de pedidos."
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
            summary = "Obtener listado de pedidos",
            description = "Se obtiene el listado con la información de los pedidos registrados"
    )
    public Response getProducts() {
        return Response.ok().entity(orderService.getOrders()).build();
    }

    @POST
    @Transactional
    @Path("/order")
    @APIResponses(
            value = {
                    @APIResponse(
                            responseCode = "200",
                            description = "Se crea el producto correctamente"
                    ),
                    @APIResponse(
                            responseCode = "400",
                            description = "No hay registros de productos en base de datos.",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON,
                                    schema = @Schema(
                                            implementation = ProblemException.class,
                                            properties = {
                                                    @SchemaProperty(
                                                            name = "detail",
                                                            example = """
                                                                        [
                                                                                "El campo description (descripción) no puede ser nulo o estar vacío.",
                                                                                "El campo prdLvlNumber (número producto) no puede ser nulo o estar vacío.",
                                                                                "El campo value (precio) no puede ser igual o menor a cero."
                                                                        ]
                                                                    """
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
            summary = "Guardar el producto",
            description = "Se guarda el producto de forma exitosa"
    )
    public Response createOrder(
            @Valid OrderDTO orderDTO
    ){
        orderService.createOrder(orderDTO);
        return Response.status(Response.Status.CREATED).build();
    }

}
