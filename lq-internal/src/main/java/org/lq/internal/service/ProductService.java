package org.lq.internal.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.lq.internal.domain.Product;
import org.lq.internal.helper.exception.PVException;
import org.lq.internal.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class ProductService {

    @Inject
    ProductRepository productRepository;

    public List<Product> getProducts() throws PVException{
        List<Product> products = productRepository.findAll();

        if (products.isEmpty()){
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "No se encontraron productos");
        }
        return products;
    }

    public Optional<Product> getProductNumber(String numberProduct) throws PVException{

        Optional<Product> product = productRepository.findById(numberProduct);

        if(product.isEmpty()){
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(),
                    "No se encontro ningún producto con el número ingresado");
        }
        return product;
    }
}
