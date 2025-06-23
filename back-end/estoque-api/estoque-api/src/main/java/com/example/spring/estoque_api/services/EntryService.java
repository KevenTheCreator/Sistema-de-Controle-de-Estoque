package com.example.spring.estoque_api.services;

import com.example.spring.estoque_api.dtos.EntryDTO;
import com.example.spring.estoque_api.models.Entry;
import com.example.spring.estoque_api.repositories.EntryRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EntryService {

    @Autowired
    private EntryRepository entryRepository;

    public ResponseEntity<Entry> addEntry(EntryDTO entryDTO) {
        Entry entry = new Entry();
        BeanUtils.copyProperties(entryDTO, entry);
        return ResponseEntity.status(HttpStatus.CREATED).body(entryRepository.save(entry));
    }

    public ResponseEntity<List<Entry>> getAllEntries() {
        return ResponseEntity.status(HttpStatus.OK).body(entryRepository.findAll());
    }

    public ResponseEntity<Entry> updateEntry(Long id, EntryDTO entryDTO) {
        Optional<Entry> entry = entryRepository.findById(id);
            if (entry.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        Entry existingEntry = entry.get();
        BeanUtils.copyProperties(entryDTO, existingEntry);
        return ResponseEntity.status(HttpStatus.OK).body(entryRepository.save(existingEntry));
    }

    public ResponseEntity<Entry> deleteEntry(Long id) {
        Optional<Entry> entry = entryRepository.findById(id);
            if (entry.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        entryRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body(entry.get());
    }
}
