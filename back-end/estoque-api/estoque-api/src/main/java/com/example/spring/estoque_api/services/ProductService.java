package com.example.spring.estoque_api.services;

import com.example.spring.estoque_api.dtos.ProductDTO;
import com.example.spring.estoque_api.models.Product;
import com.example.spring.estoque_api.repositories.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ResponseEntity<Product> addProduct(@RequestBody @Valid ProductDTO productDTO){
        Product product = new Product();
        BeanUtils.copyProperties(productDTO, product);
        try {
            productRepository.save(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(product);
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<List<Product>> getAllProducts(){
        try {
            List<Product> products = productRepository.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(products);
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

   public ResponseEntity<Product> updateProduct(@PathVariable (value = "id") Long id, @RequestBody @Valid ProductDTO updatedProductDTO) {
        Optional<Product> product = productRepository.findById(id);
            if (product.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        Product existingProduct = product.get();
        BeanUtils.copyProperties(updatedProductDTO, existingProduct);
        return ResponseEntity.status(HttpStatus.OK).body(productRepository.save(existingProduct));
    }

    public ResponseEntity<Product> deleteProduct(@PathVariable (value = "id") Long id) {
        Optional<Product> product = productRepository.findById(id);
            if (product.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        productRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body(product.get());
    }
}
