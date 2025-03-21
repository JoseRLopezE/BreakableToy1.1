package com.breakabletoy.repository;

import com.breakabletoy.model.Product;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Product Repository Tests")
public class ProductRepositoryTest {

    private static final Logger logger = LoggerFactory.getLogger(ProductRepositoryTest.class);
    private ProductRepository productRepository;
    private Product product;

    @BeforeEach
    public void setUp() {
        productRepository = new ProductRepository();
        product = new Product();
        product.setId("1");
        product.setName("Product 1");
        product.setCategory("Category 1");
        product.setPrice(10.0);
        product.setStock(100);
        product.setExpirationDate("2025-12-31");
        logger.info("Setup completed: Initialized ProductRepository and a product instance.");
    }

    @Test
    @DisplayName("Test saving a product")
    public void testSaveProduct() {
        // Test saving a product to the repository
        logger.info("Starting testSaveProduct: Saving product with ID {}", product.getId());
        productRepository.save(product);
        Product savedProduct = productRepository.findById(product.getId()).orElse(null);
        assertNotNull(savedProduct, "Product should be saved and found.");
        assertEquals(product.getId(), savedProduct.getId(), "Product ID should match.");
        logger.info("testSaveProduct PASSED: Product saved with ID {}", product.getId());
    }

    @Test
    @DisplayName("Test finding all products")
    public void testFindAllProducts() {
        // Test finding all products in the repository
        logger.info("Starting testFindAllProducts: Finding all products.");
        productRepository.save(product);  // Ensure there's at least one product saved.
        List<Product> products = productRepository.findAll();
        assertNotNull(products, "Products list should not be null.");
        assertFalse(products.isEmpty(), "Products list should contain at least one product.");
        logger.info("testFindAllProducts PASSED: Found {} products.", products.size());
    }

    @Test
    @DisplayName("Test finding a product by ID")
    public void testFindByIdProduct() {
        // Test finding a product by its ID
        logger.info("Starting testFindByIdProduct: Finding product with ID {}", product.getId());
        productRepository.save(product);
        Optional<Product> foundProduct = productRepository.findById(product.getId());
        assertTrue(foundProduct.isPresent(), "Product should be found.");
        assertEquals(product.getId(), foundProduct.get().getId(), "Product ID should match.");
        logger.info("testFindByIdProduct PASSED: Product found with ID {}", product.getId());
    }

    @Test
    @DisplayName("Test deleting a product by ID")
    public void testDeleteByIdProduct() {
        // Test deleting a product by its ID
        logger.info("Starting testDeleteByIdProduct: Deleting product with ID {}", product.getId());
        productRepository.save(product);
        productRepository.deleteById(product.getId());
        Optional<Product> deletedProduct = productRepository.findById(product.getId());
        assertFalse(deletedProduct.isPresent(), "Product should be deleted.");
        logger.info("testDeleteByIdProduct PASSED: Product deleted with ID {}", product.getId());
    }

    // Execute after each test
    @AfterEach
    public void afterEachTest() {
        logger.info("Test completed successfully!");
    }
}