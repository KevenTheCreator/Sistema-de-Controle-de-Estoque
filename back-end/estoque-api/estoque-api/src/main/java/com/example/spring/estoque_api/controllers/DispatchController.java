package com.example.spring.estoque_api.controllers;

import com.example.spring.estoque_api.models.Dispatch;
import com.example.spring.estoque_api.repositories.DispatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saidas")
public class DispatchController {

    @Autowired
    private DispatchRepository dispatchRepository;

    @GetMapping
    public List<Dispatch> listarTodasSaidas() {return dispatchRepository.findAll();}

    @PostMapping
    public Dispatch criarSaida(@RequestBody Dispatch dispatch) {return dispatchRepository.save(dispatch);}

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarSaida(@PathVariable Long id) {
        return dispatchRepository.findById(id)
                .map(entry -> {
                    dispatchRepository.delete(entry);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
