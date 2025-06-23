package com.example.spring.estoque_api.controllers;

import com.example.spring.estoque_api.dtos.DispatchDTO;
import com.example.spring.estoque_api.models.Dispatch;
import com.example.spring.estoque_api.services.DispatchService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/saidas")
public class DispatchController {

    @Autowired
    private DispatchService dispatchService;

    @PostMapping
    public ResponseEntity<Dispatch> createDispatch(@RequestBody @Valid DispatchDTO dispatchDTO) {
        return dispatchService.addDispatch(dispatchDTO);
    }

    @GetMapping
    public ResponseEntity<List<Dispatch>> getAllDispatches() {
        return dispatchService.getAllDispatches();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dispatch> updateDispatch(@PathVariable (value = "id") Long id, @RequestBody @Valid DispatchDTO dispatchDTO) {
        return dispatchService.updateDispatch(id, dispatchDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Dispatch> deleteDispatch(@PathVariable (value = "id") Long id) {
        return dispatchService.deleteDispatch(id);
    }
}
