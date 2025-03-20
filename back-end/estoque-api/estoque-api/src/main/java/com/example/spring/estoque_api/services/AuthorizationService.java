package com.example.spring.estoque_api.services;

import com.example.spring.estoque_api.dtos.AuthenticationDTO;
import com.example.spring.estoque_api.dtos.LoginResponseDTO;
import com.example.spring.estoque_api.dtos.RefreshTokenDTO;
import com.example.spring.estoque_api.models.User;
import com.example.spring.estoque_api.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class AuthorizationService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ApplicationContext applicationContext;

    private AuthenticationManager authenticationManager;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email);
    }

    public ResponseEntity<Object> login(@RequestBody @Valid AuthenticationDTO data){
        authenticationManager = applicationContext.getBean(AuthenticationManager.class);
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var user = (User) auth.getPrincipal();
        var acesstoken = tokenService.generateAcessToken(user);
        var refreshToken = tokenService.generateRefreshToken(user);
        return ResponseEntity.ok(new LoginResponseDTO(acesstoken, refreshToken));
    }

    public ResponseEntity<Object> refreshToken(RefreshTokenDTO data){
        String email = tokenService.validateRefreshToken(data.refreshToken());
        User user = (User) userRepository.findByEmail(email);

        if (user != null){
            String newAccessToken = tokenService.generateAcessToken(user);
            return ResponseEntity.ok(new LoginResponseDTO(newAccessToken, data.refreshToken()));
        }
        return ResponseEntity.status(401).body("Invalid refresh token");
    }
}
