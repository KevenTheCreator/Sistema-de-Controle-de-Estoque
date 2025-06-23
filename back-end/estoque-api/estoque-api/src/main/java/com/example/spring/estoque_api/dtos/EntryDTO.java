package com.example.spring.estoque_api.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record EntryDTO(@NotNull String produto, @Min(1) int quantidadeRecebida, @NotNull String fornecedor, @NotNull LocalDate dataDeEntrada, @NotNull String notaFiscal, @NotNull Double precoUnitario, @NotNull Double valorTotal, @NotNull String responsavel) {
}
