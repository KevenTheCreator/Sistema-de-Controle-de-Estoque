package com.example.spring.estoque_api.services;

import com.example.spring.estoque_api.dtos.DispatchDTO;
import com.example.spring.estoque_api.models.Dispatch;
import com.example.spring.estoque_api.repositories.DispatchRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DispatchService {

    @Autowired
    private DispatchRepository dispatchRepository;

    public ResponseEntity<Dispatch> addDispatch(DispatchDTO dispatchDTO) {
        Dispatch dispatch = new Dispatch();
        BeanUtils.copyProperties(dispatchDTO, dispatch);
        return ResponseEntity.status(HttpStatus.CREATED).body(dispatchRepository.save(dispatch));
    }

    public ResponseEntity<List<Dispatch>> getAllDispatches() {
        return ResponseEntity.status(HttpStatus.OK).body(dispatchRepository.findAll());
    }

    public ResponseEntity<Dispatch> updateDispatch(Long id, DispatchDTO dispatchDTO) {
        Optional<Dispatch> dispatch = dispatchRepository.findById(id);
            if (dispatch.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        Dispatch existingDispatch = dispatch.get();
        BeanUtils.copyProperties(dispatchDTO, existingDispatch);
        return ResponseEntity.status(HttpStatus.OK).body(dispatchRepository.save(existingDispatch));
    }

    public ResponseEntity<Dispatch> deleteDispatch(Long id) {
        Optional<Dispatch> dispatch = dispatchRepository.findById(id);
            if (dispatch.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        dispatchRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body(dispatch.get());
    }
}
