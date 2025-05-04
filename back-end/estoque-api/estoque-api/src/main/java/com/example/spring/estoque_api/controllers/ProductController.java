package com.example.spring.estoque_api.controllers;

import com.example.spring.estoque_api.models.Product;
import com.example.spring.estoque_api.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @PostMapping
    public Product cadastrarProduto(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> atualizarProduto(@PathVariable Long id, @RequestBody Product productAtualizado) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setProduto(productAtualizado.getProduto());
                    product.setQuantidade(productAtualizado.getQuantidade());
                    product.setFornecedor(productAtualizado.getFornecedor());
                    product.setCodigoProduto(productAtualizado.getCodigoProduto());
                    product.setUnidadeMedida(productAtualizado.getUnidadeMedida());
                    product.setCategoria(productAtualizado.getCategoria());
                    Product produtoSalvo = productRepository.save(product);
                    return ResponseEntity.ok(produtoSalvo);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarProduto(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(product -> {
                    productRepository.delete(product);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
