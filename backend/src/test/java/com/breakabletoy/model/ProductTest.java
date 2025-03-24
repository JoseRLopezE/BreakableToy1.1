package com.breakabletoy.model;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;

public class ProductTest {

    private static final Logger logger = LoggerFactory.getLogger(ProductTest.class); // Logger initialization
    private Product product;  // Declare the product variable
    
    
    @BeforeEach
    public void setUp() {
        product = new Product(null, null, null, 0, null, 0); // Initialize product object
        logger.info("Setup completed: Initialized product instance for testing.");
    }

    @Test 
    // Test setting and getting the ID of the product
    public void testSetAndGetId() {
        String id = "1234";
        logger.info("Starting testSetAndGetId: Setting product ID to {}", id);
        product.setId(id);
        assertEquals(id, product.getId(), "The ID should be set and retrieved correctly.");
        logger.info("testSetAndGetId PASSED: Product ID set to {}", product.getId());
    }

    @Test 
    // Test setting and getting the name of the product
    public void testSetAndGetName() {
        String name = "Product 1";
        logger.info("Starting testSetAndGetName: Setting product name to {}", name);
        product.setName(name);
        assertEquals(name, product.getName(), "The name should be set and retrieved correctly.");
        logger.info("testSetAndGetName PASSED: Product name set to {}", product.getName());
    }

    @Test 
    // Test setting and getting the category of the product
    public void testSetAndGetCategory() {
        String category = "Electronics";
        logger.info("Starting testSetAndGetCategory: Setting product category to {}", category);
        product.setCategory(category);
        assertEquals(category, product.getCategory(), "The category should be set and retrieved correctly.");
        logger.info("testSetAndGetCategory PASSED: Product category set to {}", product.getCategory());
    }

    @Test
    // Test setting and getting the price of the product
    public void testSetAndGetPrice() {
        double price = 199.99;
        logger.info("Starting testSetAndGetPrice: Setting product price to {}", price);
        product.setPrice(price);
        assertEquals(price, product.getPrice(), "The price should be set and retrieved correctly.");
        logger.info("testSetAndGetPrice PASSED: Product price set to {}", product.getPrice());
    }

    @Test
    // Test setting and getting the stock of the product
    public void testSetAndGetStock() {
        int stock = 50;
        logger.info("Starting testSetAndGetStock: Setting product stock to {}", stock);
        product.setStock(stock);
        assertEquals(stock, product.getStock(), "The stock should be set and retrieved correctly.");
        logger.info("testSetAndGetStock PASSED: Product stock set to {}", product.getStock());
    }

    @Test
    // Test setting and getting the expiration date of the product
    public void testSetAndGetExpirationDate() {
        String expirationDate = "2025-12-31";
        logger.info("Starting testSetAndGetExpirationDate: Setting product expiration date to {}", expirationDate);
        product.setExpirationDate(expirationDate);
        assertEquals(expirationDate, product.getExpirationDate(), "The expiration date should be set and retrieved correctly.");
        logger.info("testSetAndGetExpirationDate PASSED: Product expiration date set to {}", product.getExpirationDate());
    }

    @AfterEach
    public void afterEachTest() {
        logger.info("Test completed successfully!");
    }

}

