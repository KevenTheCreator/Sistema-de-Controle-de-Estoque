package com.example.spring.estoque_api.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.spring.estoque_api.models.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${auth.jwt.token.secret}")
    private String secretKey;

    @Value("${auth.jwt.token.expiration}")
    private Integer expiration;

    @Value("${auth.jwt.token.refresh-expiration}")
    private Integer refreshExpiration;

    public String generateAcessToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            String token = JWT.create()
                    .withIssuer("warehouse-api")
                    .withSubject(user.getEmail())
                    .withExpiresAt(getAcessTokenExpiration())
                    .sign(algorithm);
            return token;

        } catch (JWTCreationException exception){
            throw new RuntimeException("Error while generating token", exception);
        }
    }

    public String generateRefreshToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            String refreshToken = JWT.create()
                    .withIssuer("warehouse-api")
                    .withSubject(user.getEmail())
                    .withExpiresAt(getRefreshTokenExpiration())
                    .sign(algorithm);
            return refreshToken;

        } catch (JWTCreationException exception){
            throw new RuntimeException("Error while generating token", exception);
        }
    }

    public String validateAcessToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            return JWT.require(algorithm)
                    .withIssuer("warehouse-api")
                    .build()
                    .verify(token)
                    .getSubject();

        } catch (JWTVerificationException exception){
            throw new RuntimeException("Error while validating token", exception);
        }
    }

    public String validateRefreshToken(String refreshToken) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            return JWT.require(algorithm)
                    .withIssuer("warehouse-api")
                    .build()
                    .verify(refreshToken)
                    .getSubject();

        } catch (JWTVerificationException exception){
            throw new RuntimeException("Error while validating token", exception);
        }
    }

    private Instant getAcessTokenExpiration(){
        return LocalDateTime.now().plusHours(expiration).toInstant(ZoneOffset.of("-03:00"));
    }

    private Instant getRefreshTokenExpiration(){
        return LocalDateTime.now().plusHours(refreshExpiration).toInstant(ZoneOffset.of("-03:00"));
    }
}
