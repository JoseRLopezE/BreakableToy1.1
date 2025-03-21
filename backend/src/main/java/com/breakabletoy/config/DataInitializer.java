package com.breakabletoy.config;

import com.breakabletoy.model.Product;
import com.breakabletoy.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(ProductRepository productRepository) {
        return args -> {
            // Initialize categories (if needed, you can store them in a separate repository)
            List<String> categories = Arrays.asList("Electronics", "Clothing", "Books");

            // Initialize products
            List<Product> initialProducts = Arrays.asList(
                new Product("1", "Laptop", "Electronics", 999.99, "2025-12-31", 10),
                new Product("2", "T-Shirt", "Clothing", 19.99, "2026-01-01", 50),
                new Product("3", "Book", "Books", 14.99, "2027-06-15", 100),
                new Product("1", "Laptop", "Electronics", 999.99, "2025-12-31", 15),
                new Product("2", "LG 3", "Electronics", 200.99, null, 15),
                new Product("3", "Watermelon", "Food", 1.2, "2025-03-20", 50),
                new Product("4", "Milk", "Food", 1.5, "2025-12-31", 15),
                new Product("5", "T-shirt", "Clothing", 9.99, null, 20),
                new Product("6", "React Book", "Books", 19.99, null, 10),
                new Product("7", "Hammer", "Tools", 12.99, null, 5),
                new Product("8", "Smartphone", "Electronics", 699.99, "2026-06-30", 25),
                new Product("9", "Table Lamp", "Furniture", 49.99, null, 30),
                new Product("10", "Jeans", "Clothing", 39.99, null, 10),
                new Product("11", "Coffee Maker", "Appliances", 79.99, null, 8),
                new Product("12", "Microwave Oven", "Appliances", 129.99, null, 12),
                new Product("13", "Gaming Mouse", "Electronics", 49.99, null, 20),
                new Product("14", "Electric Kettle", "Appliances", 29.99, null, 15),
                new Product("15", "Headphones", "Electronics", 79.99, null, 18),
                new Product("16", "Running Shoes", "Footwear", 59.99, null, 10),
                new Product("17", "Blender", "Appliances", 39.99, null, 7),
                new Product("18", "Frying Pan", "Kitchenware", 15.99, null, 20),
                new Product("19", "Backpack", "Accessories", 29.99, null, 15),
                new Product("20", "Wrench Set", "Tools", 25.99, null, 5),
                new Product("21", "Sunglasses", "Accessories", 19.99, null, 0)
            );

            // Save products to the repository
            initialProducts.forEach(productRepository::save);
        };
    }
}