package com.example.spring.estoque_api.services;

import com.example.spring.estoque_api.dtos.*;
import com.example.spring.estoque_api.models.User;
import com.example.spring.estoque_api.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

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

    public void forgotPassword(ForgotPasswordDTO data){
        User user = (User) userRepository.findByEmail(data.email());
        if (user != null){
            String resetToken = tokenService.generateResetPasswordToken(user);
            sendPasswordResetEmail(user.getEmail(), resetToken);
        }
    }

    private void sendPasswordResetEmail(String email, String token){
        String resetLink = "http://localhost:5173/redefinirSenha?token=" + token;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Redefinição de Senha");
        message.setText("Clique no link para redefinir sua senha: " + resetLink);
        mailSender.send(message);
    }

    public void resetPassword(ResetPasswordDTO data){
        String email = tokenService.validateResetPasswordToken(data.token());
        User user = (User) userRepository.findByEmail(email);
        if (user != null){
            String encodedPassword = passwordEncoder.encode(data.newPassword());
            user.setPassword(encodedPassword);
            userRepository.save(user);
        }
    }
}
