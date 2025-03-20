package com.example.spring.estoque_api.controllers;

import com.example.spring.estoque_api.dtos.AuthenticationDTO;
import com.example.spring.estoque_api.dtos.RefreshTokenDTO;
import com.example.spring.estoque_api.services.AuthorizationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthController {

    @Autowired
    private AuthorizationService authorizationService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody @Valid AuthenticationDTO data){
        return authorizationService.login(data);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<Object> refreshToken(@RequestBody @Valid RefreshTokenDTO data){
        return authorizationService.refreshToken(data);
    }
}
