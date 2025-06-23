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
@Table(name = "tb_entradas")
public class Entry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String produto;

    private int quantidadeRecebida;

    private String fornecedor;

    private LocalDate dataDeEntrada;

    private String notaFiscal;

    private Double precoUnitario;

    private Double valorTotal;

    private String responsavel;
}
