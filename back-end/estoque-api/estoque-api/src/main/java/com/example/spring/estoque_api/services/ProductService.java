package com.example.spring.estoque_api.services;

import com.example.spring.estoque_api.dtos.ProductDTO;
import com.example.spring.estoque_api.models.Product;
import com.example.spring.estoque_api.repositories.ProductRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ResponseEntity<Product> addProduct(ProductDTO productDTO){
        Product product = new Product();
        BeanUtils.copyProperties(productDTO, product);
        return ResponseEntity.status(HttpStatus.CREATED).body(productRepository.save(product));
    }

    public ResponseEntity<List<Product>> getAllProducts(){
        return ResponseEntity.status(HttpStatus.OK).body(productRepository.findAll());
    }

   public ResponseEntity<Product> updateProduct(Long id, ProductDTO updatedProductDTO) {
        Optional<Product> product = productRepository.findById(id);
            if (product.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        Product existingProduct = product.get();
        BeanUtils.copyProperties(updatedProductDTO, existingProduct);
        return ResponseEntity.status(HttpStatus.OK).body(productRepository.save(existingProduct));
    }

    public ResponseEntity<Product> deleteProduct(Long id) {
        Optional<Product> product = productRepository.findById(id);
            if (product.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        productRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body(product.get());
    }
}
