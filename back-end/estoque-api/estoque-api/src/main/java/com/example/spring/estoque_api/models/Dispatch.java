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

    @Column (nullable = false)
    private String produto;

    @Column (nullable = false)
    private int quantidadeRetirada;

    @Column (nullable = false)
    private LocalDate dataSaida;

    private LocalDate dataDevolucao;

    @Column (nullable = false)
    private String nomeSolicitante;

    @Column (nullable = false)
    private String tipoSolicitante;

    @Column (nullable = false)
    private String destino;

    private String status;

}