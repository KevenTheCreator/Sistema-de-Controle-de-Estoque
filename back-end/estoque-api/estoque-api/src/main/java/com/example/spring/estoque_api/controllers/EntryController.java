package com.example.spring.estoque_api.controllers;

import com.example.spring.estoque_api.dtos.EntryDTO;
import com.example.spring.estoque_api.models.Entry;
import com.example.spring.estoque_api.services.EntryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/entradas")
public class EntryController {

    @Autowired
    private EntryService entryService;

    @PreAuthorize("hasRole('ALMOXARIFE')")
    @PostMapping
    public ResponseEntity<Entry> createEntry(@RequestBody @Valid EntryDTO entryDTO) {
        return entryService.addEntry(entryDTO);
    }

    @PreAuthorize("hasRole('ALMOXARIFE')")
    @GetMapping
    public ResponseEntity<List<Entry>> getAllEntries() {
        return entryService.getAllEntries();
    }

    @PreAuthorize("hasRole('ALMOXARIFE')")
    @PutMapping("/{id}")
    public ResponseEntity<Entry> updateEntry(@PathVariable Long id, @RequestBody @Valid EntryDTO entryDTO) {
        return entryService.updateEntry(id, entryDTO);
    }

    @PreAuthorize("hasRole('ALMOXARIFE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Entry> deleteEntry(@PathVariable Long id) {
        return entryService.deleteEntry(id);
    }
}
