package com.breakabletoy.controller;

import com.breakabletoy.model.Product;
import com.breakabletoy.service.ProductService;

import lombok.extern.java.Log;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
public class ProductControllerTest {

    private static final Logger logger = LoggerFactory.getLogger(ProductControllerTest.class);

    @Autowired
    private MockMvc mockMvc;

    @MockBean  // Use @MockBean to mock the service layer
    private ProductService productService;

    @InjectMocks
    private ProductController productController;

    private Product product;

    @BeforeEach
    public void setUp() {
        // Initialize mocks manually
        MockitoAnnotations.openMocks(this);

        product = new Product();
        product.setName("Product 1");
        product.setCategory("Category 1");
        product.setPrice(10.0);
        product.setStock(100);
        product.setExpirationDate("2025-12-31");
        // Generate a random UUID and assign it to the product
        String generatedId = UUID.randomUUID().toString();
        product.setId(generatedId);
    }

    @Test
    @DisplayName("Test createProduct creates a new product")
    public void testCreateProduct() throws Exception {
        logger.info("testCreateProduct - Creating product with name: {}", product.getName());
        // Return the product when the service is called to create a product
        when(productService.createProduct(any(Product.class))).thenReturn(product);

        mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\": \"Product 1\", \"category\": \"Category 1\", \"price\": 10.0, \"stock\": 100, \"expirationDate\": \"2025-12-31\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Product 1"))
                .andExpect(jsonPath("$.category").value("Category 1"))
                .andExpect(jsonPath("$.price").value(10.0))
                .andExpect(jsonPath("$.stock").value(100))
                .andExpect(jsonPath("$.expirationDate").value("2025-12-31"));

        verify(productService, times(1)).createProduct(any(Product.class));
         // Log success message
         logger.info("testCreateProduct - Test PASSED: Product created with name: {}", product.getName());
    }

    @Test
    @DisplayName("Test getProductById returns product")
    public void testGetProductById_Found() throws Exception {
        logger.info("testGetProductById_Found - Initial product with ID: {}, name: {}", product.getId(), product.getName());
        // Return the product when the service is called with the product ID
        when(productService.getProductById(product.getId())).thenReturn(Optional.of(product));

        mockMvc.perform(get("/api/products/{id}", product.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Product 1"))
                .andExpect(jsonPath("$.category").value("Category 1"))
                .andExpect(jsonPath("$.price").value(10.0))
                .andExpect(jsonPath("$.stock").value(100))
                .andExpect(jsonPath("$.expirationDate").value("2025-12-31"));

        verify(productService, times(1)).getProductById(product.getId());
        // Log success message
        logger.info("testGetProductById_Found - Test PASSED: Product found with ID: {}", product.getId());
    }

    @Test
    @DisplayName("Test getProductById returns 404 when product not found")
    public void testGetProductById_NotFound() throws Exception {
        logger.info("testGetProductById_NotFound - Product with ID: {} not found", product.getId());
        // Return empty when the service is called with a non-existing product ID
        when(productService.getProductById(product.getId())).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/products/{id}", product.getId()))
                .andExpect(status().isNotFound());

        verify(productService, times(1)).getProductById(product.getId());
        // Log success message
        logger.info("testGetProductById_NotFound - Test PASSED: Product with ID: {} not found", product.getId());
    }

    @Test
    @DisplayName("Test getAllProducts returns list of products")
    public void testGetAllProducts() throws Exception {
        logger.info("testGetAllProducts - Initial product with ID: {}, name: {}, category:{}", product.getId(), product.getName(), product.getCategory());
        // Return a list with one product
        when(productService.getAllProducts()).thenReturn(Arrays.asList(product));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Product 1"))
                .andExpect(jsonPath("$[0].category").value("Category 1"))
                .andExpect(jsonPath("$[0].price").value(10.0))
                .andExpect(jsonPath("$[0].stock").value(100))
                .andExpect(jsonPath("$[0].expirationDate").value("2025-12-31"));

        verify(productService, times(1)).getAllProducts();

        // Log success message
        logger.info("testGetAllProducts - Test PASSED: List of products returned");
    }
}

