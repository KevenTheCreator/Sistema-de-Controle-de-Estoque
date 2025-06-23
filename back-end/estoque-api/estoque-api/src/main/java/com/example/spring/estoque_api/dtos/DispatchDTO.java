package com.example.spring.estoque_api.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record DispatchDTO(@NotNull String produto, @Min(1) int quantidadeRetirada, @NotNull LocalDate dataSaida, LocalDate dataDevolucao, @NotNull String nomeSolicitante, @NotNull String tipoSolicitante, @NotNull String destino, String status) {
}
