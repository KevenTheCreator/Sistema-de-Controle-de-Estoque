package com.example.spring.estoque_api.controllers;

import com.example.spring.estoque_api.dtos.AuthenticationDTO;
import com.example.spring.estoque_api.dtos.ForgotPasswordDTO;
import com.example.spring.estoque_api.dtos.RefreshTokenDTO;
import com.example.spring.estoque_api.dtos.ResetPasswordDTO;
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

    @PostMapping("/forgot-password")
    public ResponseEntity<Object> forgotPassword(@RequestBody @Valid ForgotPasswordDTO data){
        authorizationService.forgotPassword(data);
        return ResponseEntity.ok("Se o email estiver registrado, você receberá um link para redefinir sua senha");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Object> resetPassword(@RequestBody @Valid ResetPasswordDTO data){
        authorizationService.resetPassword(data);
        return ResponseEntity.ok("Senha redefinida com sucesso!");
    }
}
