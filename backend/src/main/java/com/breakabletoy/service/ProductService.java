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

    /**
     * Retrieves a product by its ID.
     * @param id the ID of the product to retrieve.
     * @return an Optional containing the product if found, or empty if not found.
     */
    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    /**
     * Creates a new product and saves it to the repository.
     * Generates a unique ID for the product before saving.
     * TODO: Add error handling for cases where saving fails.
     * @param product the product to create.
     * @return the created product.
     */
    public Product createProduct(Product product) {
        product.setId(UUID.randomUUID().toString());
        return productRepository.save(product);   // Potential improvement: handle exceptions if save fails
    }

    /**
     * Updates an existing product by its ID.
     * If the product exists, updates its fields and saves it back to the repository.
     * TODO: Add error handling for cases where the product is not found or saving fails.
     * @param id the ID of the product to update.
     * @param product the product data to update.
     * @return an Optional containing the updated product if successful, or empty if the product was not found.
     */
    public Optional<Product> updateProduct(String id, Product product) {
        return productRepository.findById(id).map(existingProduct -> {
            existingProduct.setName(product.getName());
            existingProduct.setCategory(product.getCategory());  // Ensure category is valid before setting
            existingProduct.setPrice(product.getPrice());
            existingProduct.setStock(product.getStock());
            existingProduct.setExpirationDate(product.getExpirationDate());
            return productRepository.save(existingProduct);  // Potential improvement: handle exceptions if save fails
        });
    }

  
    public Optional<Product> updateStock(String id, boolean outOfStock) {
        return productRepository.findById(id).map(product -> {
            product.setStock(outOfStock ? 0 : 10); // Set stock to 0 if checked, 10 if unchecked
            return productRepository.save(product);
        });
    }

   
    public void deleteProduct(String id) {
        productRepository.deleteById(id);  // Potential improvement: check if the product exists before deleting
    }
}