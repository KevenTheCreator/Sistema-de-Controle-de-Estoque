package com.example.spring.estoque_api.controllers;

import com.example.spring.estoque_api.models.Entry;
import com.example.spring.estoque_api.repositories.EntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/entradas")
public class EntryController {

    @Autowired
    private EntryRepository entryRepository;

    @GetMapping
    public List<Entry> ListarTodasEntradas() {
        return entryRepository.findAll();
    }

    @PostMapping
    public Entry CadastrarEntrada(@RequestBody Entry entry) {
        return entryRepository.save(entry);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Entry> AtualizarEntrada(@PathVariable Long id, @RequestBody Entry entryAtualizado) {
        return entryRepository.findById(id)
                .map(entry -> {
                    entry.setProduto(entryAtualizado.getProduto());
                    entry.setQuantidadeRecebida(entryAtualizado.getQuantidadeRecebida());
                    entry.setFornecedor(entryAtualizado.getFornecedor());
                    entry.setDataDeEntrada(entryAtualizado.getDataDeEntrada());
                    entry.setNotaFiscal(entryAtualizado.getNotaFiscal());
                    entry.setPrecoUnitario(entryAtualizado.getPrecoUnitario());
                    entry.setValorTotal(entryAtualizado.getValorTotal());
                    entry.setResponsavel(entryAtualizado.getResponsavel());
                    Entry entradaSalva = entryRepository.save(entry);
                    return ResponseEntity.ok(entradaSalva);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> DeletarEntrada(@PathVariable Long id) {
        return entryRepository.findById(id)
                .map(entry -> {
                    entryRepository.delete(entry);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
