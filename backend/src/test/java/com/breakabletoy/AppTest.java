package com.breakabletoy;

import com.breakabletoy.model.Product;
import com.breakabletoy.repository.ProductRepository;
import com.breakabletoy.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class AppTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllProducts() {
        Product product = new Product();
        product.setName("Test Product");
        when(productRepository.findAll()).thenReturn(List.of(product));

        List<Product> products = productService.getAllProducts();

        assertEquals(1, products.size());
        assertEquals("Test Product", products.get(0).getName());
        verify(productRepository, times(1)).findAll();
    }

    @Test
    void testGetProductById() {
        Product product = new Product();
        product.setId("1");
        when(productRepository.findById("1")).thenReturn(Optional.of(product));

        Optional<Product> result = productService.getProductById("1");

        assertTrue(result.isPresent());
        assertEquals("1", result.get().getId());
        verify(productRepository, times(1)).findById("1");
    }

    @Test
    void testCreateProduct() {
        Product product = new Product();
        product.setName("New Product");
        when(productRepository.save(any(Product.class))).thenReturn(product);

        Product createdProduct = productService.createProduct(product);

        assertNotNull(createdProduct);
        assertEquals("New Product", createdProduct.getName());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void testUpdateProduct() {
        Product existingProduct = new Product();
        existingProduct.setId("1");
        existingProduct.setName("Old Name");

        Product updatedProduct = new Product();
        updatedProduct.setName("New Name");

        when(productRepository.findById("1")).thenReturn(Optional.of(existingProduct));
        when(productRepository.save(any(Product.class))).thenReturn(existingProduct);

        Optional<Product> result = productService.updateProduct("1", updatedProduct);

        assertTrue(result.isPresent());
        assertEquals("New Name", result.get().getName());
        verify(productRepository, times(1)).findById("1");
        verify(productRepository, times(1)).save(existingProduct);
    }

    @Test
    void testDeleteProduct() {
        doNothing().when(productRepository).deleteById("1");

        productService.deleteProduct("1");

        verify(productRepository, times(1)).deleteById("1");
    }

    @Test
    void contextLoads() {
    }
}