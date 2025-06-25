package com.example.spring.estoque_api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table (name = "tb_saidas")
public class Dispatch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String produto;

    private int quantidadeRetirada;

    private LocalDate dataSaida;

    private LocalDate dataDevolucao;

    private String nomeSolicitante;

    private String tipoSolicitante;

    private String destino;

    private String status;
}