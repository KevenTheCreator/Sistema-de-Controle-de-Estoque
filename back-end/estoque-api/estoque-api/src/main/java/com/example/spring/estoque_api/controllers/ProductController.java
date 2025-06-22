package com.example.spring.estoque_api.controllers;

import com.example.spring.estoque_api.dtos.ProductDTO;
import com.example.spring.estoque_api.models.Product;
import com.example.spring.estoque_api.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody @Valid ProductDTO productDTO) {
        return productService.addProduct(productDTO);
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return productService.getAllProducts();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable (value = "id") Long id, @RequestBody @Valid ProductDTO updatedProductDTO) {
        return productService.updateProduct(id, updatedProductDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable (value = "id") Long id) {
        return productService.deleteProduct(id);
    }
}
