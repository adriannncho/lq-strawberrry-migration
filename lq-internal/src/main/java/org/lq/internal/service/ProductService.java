package org.lq.internal.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import org.lq.internal.domain.detailProduct.DetailProduct;
import org.lq.internal.domain.product.Product;
import org.lq.internal.domain.product.ProductDTO;
import org.lq.internal.helper.exception.PVException;
import org.lq.internal.repository.DetailProductRepository;
import org.lq.internal.repository.ProductRepository;

import java.util.List;

@ApplicationScoped
public class ProductService {

    private final Logger LOG = Logger.getLogger(ProductService.class);

    @Inject
    ProductRepository productRepository;

    @Inject
    DetailProductRepository detailProductRepository;

    public List<Product> getProducts() throws PVException {
        LOG.infof("@getProducts SERV > Start service to obtain the products");

        List<Product> products = productRepository.listAll();
        LOG.infof("@getProducts SERV > Retrieved list of products");

        if (products.isEmpty()) {
            LOG.warnf("@getProducts SERV > No products found");
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "No se encontraron productos");
        }

        for (Product product : products) {
            LOG.infof("@getProducts SERV > Fetching detail products for product ID %d", product.getPrdLvlNumber());
            List<DetailProduct> detailProducts = detailProductRepository.list("idProduct", product.getPrdLvlNumber());

            LOG.infof("@getProducts SERV > Found %d detail products for product ID %d", detailProducts.size(), product.getPrdLvlNumber());
            product.setDetailProduct(detailProducts);
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
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "No se encontró ningún producto con el número ingresado");
        }

        LOG.infof("@getProductNumber SERV > Fetching detail products for product ID %d", numberProduct);
        List<DetailProduct> detailProducts = detailProductRepository.list("idProduct", product.getPrdLvlNumber());

        LOG.infof("@getProductNumber SERV > Found %d detail products for product ID %d", detailProducts.size(), numberProduct);
        product.setDetailProduct(detailProducts);

        LOG.infof("@getProductNumber SERV > Product with number %d obtained successfully", numberProduct);
        LOG.infof("@getProductNumber SERV > Finish service to obtain the product with number %d", numberProduct);
        return product;
    }



    public void saveProduct(ProductDTO productDTO) throws PVException {
        LOG.infof("@saveProduct SERV > Start service to save a new product");

        LOG.infof("@saveProduct SERV > Creating product entity from DTO");
        Product product = Product.builder()
                .name(productDTO.getName())
                .size(productDTO.getSize())
                .description(productDTO.getDescription())
                .value(productDTO.getValue())
                .build();

        LOG.infof("@saveProduct SERV > Persisting product with name %s", productDTO.getName());
        productRepository.persist(product);

        for (DetailProduct detailProduct : productDTO.getDetailProduct()) {
            LOG.infof("@saveProduct SERV > Creating detail product entity from DTO for product ID %d", product.getPrdLvlNumber());
            DetailProduct detailProductSave = DetailProduct.builder()
                    .idProduct(product.getPrdLvlNumber())
                    .idIngredient(detailProduct.getIdIngredient())
                    .quantity(detailProduct.getQuantity())
                    .build();

            LOG.infof("@saveProduct SERV > Persisting detail product for product ID %d and ingredient ID %d", product.getPrdLvlNumber(), detailProduct.getIdIngredient());
            detailProductRepository.persist(detailProductSave);
        }

        LOG.infof("@saveProduct SERV > Product saved successfully with name %s", productDTO.getName());
    }

    public void updateProduct(ProductDTO productDTO) throws PVException {
        LOG.infof("@updateProduct SERV > Start service to update product with number %d", productDTO.getPrdLvlNumber());

        LOG.infof("@updateProduct SERV > Searching for existing product with number %d", productDTO.getPrdLvlNumber());
        Product existingProduct = productRepository.findById((long) productDTO.getPrdLvlNumber());
        if (existingProduct == null) {
            LOG.warnf("@updateProduct SERV > No product found with number %d", productDTO.getPrdLvlNumber());
            throw new PVException(Response.Status.NOT_FOUND.getStatusCode(), "El producto no fue encontrado.");
        }

        LOG.infof("@updateProduct SERV > Updating product entity with number %d", productDTO.getPrdLvlNumber());
        existingProduct.setName(productDTO.getName());
        existingProduct.setDescription(productDTO.getDescription());
        existingProduct.setValue(productDTO.getValue() != null ? productDTO.getValue() : 0L);
        existingProduct.setSize(productDTO.getSize());

        LOG.infof("@updateProduct SERV > Persisting updated product with number %d", productDTO.getPrdLvlNumber());
        productRepository.persist(existingProduct);

        LOG.infof("@updateProduct SERV > Fetching existing detail products for product ID %d", productDTO.getPrdLvlNumber());
        List<DetailProduct> existingDetailProducts = detailProductRepository.list("idProduct", existingProduct.getPrdLvlNumber());

        LOG.infof("@updateProduct SERV > Updating detail products for product ID %d", productDTO.getPrdLvlNumber());
        for (DetailProduct detailProductDTO : productDTO.getDetailProduct()) {
            boolean detailExists = false;
            for (DetailProduct existingDetailProduct : existingDetailProducts) {
                if (existingDetailProduct.getIdIngredient() == detailProductDTO.getIdIngredient()) {
                    LOG.infof("@updateProduct SERV > Updating existing detail product with ingredient ID %d", detailProductDTO.getIdIngredient());
                    existingDetailProduct.setQuantity(detailProductDTO.getQuantity());
                    detailProductRepository.persist(existingDetailProduct);
                    detailExists = true;
                    break;
                }
            }
            if (!detailExists) {
                LOG.infof("@updateProduct SERV > Creating new detail product for ingredient ID %d", detailProductDTO.getIdIngredient());
                DetailProduct newDetailProduct = DetailProduct.builder()
                        .idProduct(existingProduct.getPrdLvlNumber())
                        .idIngredient(detailProductDTO.getIdIngredient())
                        .quantity(detailProductDTO.getQuantity())
                        .build();
                detailProductRepository.persist(newDetailProduct);
            }
        }

        LOG.infof("@updateProduct SERV > Product with number %d updated successfully", productDTO.getPrdLvlNumber());
    }
}
