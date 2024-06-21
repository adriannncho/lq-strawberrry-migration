package org.lq.internal.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.lq.internal.domain.product.Product;
import org.lq.internal.domain.product.ProductDTO;
import org.lq.internal.helper.exception.PVException;
import org.lq.internal.repository.ProductRepository;

import java.util.List;
import org.jboss.logging.Logger;

@ApplicationScoped
public class ProductService {

    private final Logger LOG = Logger.getLogger(ProductService.class);

    @Inject
    ProductRepository productRepository;

    public List<Product> getProducts() throws PVException {
        LOG.infof("@getProducts SERV > Start service to obtain the products");

        List<Product> products = productRepository.listAll();
        LOG.infof("@getProducts SERV > Retrieved list of products");

        if (products.isEmpty()) {
            LOG.warnf("@getProducts SERV > No products found");
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "No se encontraron productos");
        }

        LOG.infof("@getProducts SERV > Finish service to obtain the products");
        return products;
    }


    public Product getProductNumber(long numberProduct) throws PVException {
        LOG.infof("@getProductNumber SERV > Start service to obtain the product with number %d", numberProduct);

        LOG.infof("@getProductNumber SERV > Searching for product with number %d", numberProduct);
        Product product = productRepository.findById(numberProduct);

        if (product == null) {
            LOG.warnf("@getProductNumber SERV > No product found with number %d", numberProduct);
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "No se encontro ningún producto con el número ingresado");
        }

        LOG.infof("@getProductNumber SERV > Product with number %d obtained successfully", numberProduct);
        LOG.infof("@getProductNumber SERV > Finish service to obtain the product with number %d", numberProduct);
        return product;
    }


    public void saveProduct(ProductDTO productDTO) throws PVException {
        LOG.infof("@saveProduct SERV > Start service to save a new product");

        LOG.infof("@saveProduct SERV > Creating product entity from DTO");
        Product product = Product.builder()
                .name(productDTO.getName())
                .description(productDTO.getDescription())
                .value(productDTO.getValue())
                .build();

        LOG.infof("@saveProduct SERV > Persisting product with name %s", productDTO.getName());
        productRepository.persist(product);

        LOG.infof("@saveProduct SERV > Product saved successfully with name %s", productDTO.getName());
    }


    public void updateProduct(ProductDTO product) throws PVException {
        LOG.infof("@updateProduct SERV > Start service to update product with number %d", product.getPrdLvlNumber());

        LOG.infof("@updateProduct SERV > Searching for existing product with number %d", product.getPrdLvlNumber());
        Product existingProduct = productRepository.findById(product.getPrdLvlNumber());
        if (existingProduct == null) {
            LOG.warnf("@updateProduct SERV > No product found with number %d", product.getPrdLvlNumber());
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "El producto no fue encontrado.");
        }

        LOG.infof("@updateProduct SERV > Updating product entity with number %d", product.getPrdLvlNumber());
        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setValue(product.getValue() != null ? product.getValue() : 0L);
        existingProduct.setSize(product.getSize() != null ? product.getSize() : 0L);

        LOG.infof("@updateProduct SERV > Persisting updated product with number %d", product.getPrdLvlNumber());
        productRepository.persist(existingProduct);

        LOG.infof("@updateProduct SERV > Product with number %d updated successfully", product.getPrdLvlNumber());
    }

}
