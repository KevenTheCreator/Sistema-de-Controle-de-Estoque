package com.example.spring.estoque_api.dtos;

import jakarta.validation.constraints.NotNull;

public record ProductDTO(@NotNull String produto, @NotNull int quantidade, @NotNull String fornecedor, @NotNull String codigoProduto, @NotNull String unidadeMedida, @NotNull String categoria) {
}
