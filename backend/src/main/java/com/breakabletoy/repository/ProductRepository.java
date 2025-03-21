package com.breakabletoy.repository;

import com.breakabletoy.model.Product;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class ProductRepository {
    private final Map<String, Product> productMap = new HashMap<>();

    public List<Product> findAll() {
        return new ArrayList<>(productMap.values());
    }

    public Optional<Product> findById(String id) {
        return Optional.ofNullable(productMap.get(id));
    }

    public Product save(Product product) {
        if (product.getId() == null || product.getId().isEmpty()) {
            product.setId(UUID.randomUUID().toString()); // Generate a unique ID if not provided
        }
        productMap.put(product.getId(), product);
        return product;
    }

    public void deleteById(String id) {
        productMap.remove(id);
    }
}