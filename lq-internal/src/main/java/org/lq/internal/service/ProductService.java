package org.lq.internal.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.lq.internal.domain.product.Product;
import org.lq.internal.domain.product.ProductDTO;
import org.lq.internal.helper.exception.PVException;
import org.lq.internal.repository.ProductRepository;

import java.util.List;

@ApplicationScoped
public class ProductService {

    @Inject
    ProductRepository productRepository;

    public List<Product> getProducts() throws PVException {
        List<Product> products = productRepository.listAll();

        if (products.isEmpty()) {
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "No se encontraron productos");
        }

        return products;
    }

    public Product getProductNumber(long numberProduct) throws PVException{

        Product product = productRepository.findById(numberProduct);

        if(product == null){
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(),
                    "No se encontro ningún producto con el número ingresado");
        }
        return product;
    }

    public void saveProduct(ProductDTO productDTO) throws PVException{

        Product product = Product.builder()
                .name(productDTO.getName())
                .description(productDTO.getDescription())
                .value(productDTO.getValue())
                .build();

        productRepository.persist(product);
    }

    public void updateProduct(ProductDTO product) throws PVException{

        Product existingProduct = productRepository.findById(product.getPrdLvlNumber());
        if (existingProduct == null) {
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "El producto no fue encontrado.");
        }


        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setValue(product.getValue() != null ? product.getValue() : 0L);
        existingProduct.setSize(product.getSize() != null ? product.getSize() : 0L);

        productRepository.persist(existingProduct);
    }
}
