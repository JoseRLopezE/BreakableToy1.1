package com.breakabletoy.service;

import com.breakabletoy.model.Product;
import com.breakabletoy.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        product.setId(UUID.randomUUID().toString());
        return productRepository.save(product);
    }

    public Optional<Product> updateProduct(String id, Product product) {
        return productRepository.findById(id).map(existingProduct -> {
            existingProduct.setName(product.getName());
            existingProduct.setCategory(product.getCategory());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setStock(product.getStock());
            existingProduct.setExpirationDate(product.getExpirationDate());
            return productRepository.save(existingProduct);
        });
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}