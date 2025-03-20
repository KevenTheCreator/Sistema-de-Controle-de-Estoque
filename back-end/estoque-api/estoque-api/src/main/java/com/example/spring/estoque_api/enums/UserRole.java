package com.example.spring.estoque_api.enums;

import lombok.Getter;

@Getter
public enum UserRole {
    ALMOXARIFE("almoxarife");

    private final String role;

    UserRole(String role) {
        this.role = role;
    }
}
