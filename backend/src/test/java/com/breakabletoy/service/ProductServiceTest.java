package com.breakabletoy.service;

import com.breakabletoy.model.Product;
import com.breakabletoy.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ProductServiceTest {

    private static final Logger logger = LoggerFactory.getLogger(ProductServiceTest.class);

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

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
    // Test creating a new product
    public void testCreateProduct() {
        // Log test start
        logger.info("Running testCreateProduct...");

        // Arrange
        Product product2 = new Product();
        product2.setName("Product 2");
        product2.setCategory("Category 2");
        product2.setPrice(10.0);
        product2.setStock(100);
        product2.setExpirationDate("2025-12-31");

        // Generate a random UUID and assign it to the product
        String generatedId = UUID.randomUUID().toString();
        product2.setId(generatedId);

        // Mock repository save method to return the product with generated ID
        when(productRepository.save(any(Product.class))).thenReturn(product2);

        // Act
        Product result = productService.createProduct(product2);

        // Assert
        assertNotNull(result); // Ensure the result is not null
        assertNotNull(product2.getId(), "Product ID should not be null.");
        //assertEquals(generatedId, result.getId()); // Ensure the product ID (generated) matches the saved product ID
        assertEquals("Product 2", result.getName()); // Ensure the name is correct
        assertEquals("Category 2", result.getCategory()); // Ensure the category is correct
        assertEquals(10.0, result.getPrice()); // Ensure the price is correct
        assertEquals(100, result.getStock()); // Ensure the stock is correct
        assertEquals("2025-12-31", result.getExpirationDate()); // Ensure the expiration date is correct

        // Verify that the save method was called once with any Product object
        verify(productRepository, times(1)).save(any(Product.class));
        

        // Log success of the test
        logger.info("Test testCreateProduct PASSED. Product created with ID: {}, Name: {}, Category: {}, Price: {}, Stock: {}, Expiration Date: {}",
    result.getId(), result.getName(), result.getCategory(), result.getPrice(), result.getStock(), result.getExpirationDate());
    }



    @Test
    // Test updating an existing product
    public void testUpdateProduct() {
        logger.info("testUpdateProduct - Initial product with ID: {}, name: {}, category:{}", product.getId(), product.getName(), product.getCategory());
        // Arrange
        Product updatedProduct = new Product();
        updatedProduct.setId(product.getId());  // Use the same ID as the original product
        updatedProduct.setName("Updated Product");  // New values for the updated product
        updatedProduct.setCategory("Updated Category");
        updatedProduct.setPrice(15.0);
        updatedProduct.setStock(50);
        updatedProduct.setExpirationDate("2025-12-31");

        // Mock repository behavior
        when(productRepository.findById(product.getId())).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenReturn(updatedProduct);

        // Act
        Optional<Product> result = productService.updateProduct(product.getId(), updatedProduct);

        // Log the updated product
        result.ifPresent(p -> logger.info("testUpdateProduct - Updated Product: ID: {}, Name: {}, Category: {}, Price: {}, Stock: {}, Expiration Date: {}",
                p.getId(), p.getName(), p.getCategory(), p.getPrice(), p.getStock(), p.getExpirationDate()));

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Updated Product", result.get().getName());  // Ensure name is updated
        assertEquals("Updated Category", result.get().getCategory());  // Ensure category is updated
        assertEquals(15.0, result.get().getPrice());  // Ensure price is updated
        assertEquals(50, result.get().getStock());  // Ensure stock is updated
        assertEquals("2025-12-31", result.get().getExpirationDate());  // Ensure expiration date is correct

        // Verify repository calls
        verify(productRepository, times(1)).findById(product.getId());
        verify(productRepository, times(1)).save(any(Product.class));

    
        // Log success message
        logger.info("testUpdateProduct - Test PASSED");
    }


    @Test
    // Test deleting an existing product
    public void testDeleteProduct() {
        logger.info("testDeleteProduct - Initial product with ID: {}, name: {}", product.getId(), product.getName());

        // Arrange
        doNothing().when(productRepository).deleteById(product.getId());

        // Act
        productService.deleteProduct(product.getId());

        // Assert
        verify(productRepository, times(1)).deleteById(product.getId());

        // Log success message
        logger.info("testDeleteProduct - Test PASSED");
    }

    @Test
    // Test deleting a product that does not exist
    public void testDeleteProductNotFound() {
        // Arrange
        doNothing().when(productRepository).deleteById("not_id");

        // Act
        productService.deleteProduct("not_id");

        // Assert
        verify(productRepository, times(1)).deleteById("not_id");

        // Log success message
        logger.info("testDeleteProductNotFound - Test PASSED");
    }

    @Test
    // Test retrieving all products
    public void testGetAllProducts() {
        // Arrange
        List<Product> productList = Arrays.asList(product);
        when(productRepository.findAll()).thenReturn(productList);

        // Act
        List<Product> result = productService.getAllProducts();

        // Log the product list
        logger.info("testGetAllProducts - Product List: {}", result);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Product 1", result.get(0).getName());
        verify(productRepository, times(1)).findAll();

        // Log success message
        logger.info("testGetAllProducts - Test PASSED");
    }

    @Test
    // Test retrieving a product by its ID
    public void testGetProductById() {
        // Log the ID and name of the initial product
        logger.info("testGetProductById - Initial product with ID: {}, name: {}", product.getId(), product.getName());

        // Arrange
        // Use the dynamically generated ID for the findById() method
        when(productRepository.findById(product.getId())).thenReturn(Optional.of(product));

        // Act
        Optional<Product> result = productService.getProductById(product.getId());

        // Log the product details if it is found
        result.ifPresent(p -> logger.info("testGetProductById - Product: {}, ID: {}, name: {}", p,p.getId(), p.getName()));

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Product 1", result.get().getName());  // Ensure the name matches the original
        verify(productRepository, times(1)).findById(product.getId());  // Verify that findById was called with the correct ID

        // Log success message
        logger.info("testGetProductById - Test Passed");
    }


    @Test
    // Test retrieving a product by an ID that does not exist
    public void testGetProductByIdNotFound() {
        // Arrange
        when(productRepository.findById("not_id")).thenReturn(Optional.empty());

        // Act
        Optional<Product> result = productService.getProductById("not_id");

        // Log the result (empty)
        logger.info("testGetProductByIdNotFound - Result: {}", result);

        // Assert
        assertFalse(result.isPresent());
        verify(productRepository, times(1)).findById("not_id");

        // Log success message
        logger.info("testGetProductByIdNotFound - Test Passed");
    }

   
    // Execute after each test
    @AfterEach
    public void afterEachTest() {
        logger.info("Test completed successfully!");
    }
}
