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

    @Column(nullable = false)
    private String produto;

    @Column(nullable = false)
    private int quantidadeRecebida;

    @Column(nullable = false)
    private String fornecedor;

    @Column(nullable = false)
    private LocalDate dataDeEntrada;

    @Column(nullable = false)
    private String notaFiscal;

    @Column(nullable = false)
    private Double precoUnitario;

    @Column(nullable = false)
    private Double valorTotal;

    @Column(nullable = false)
    private String responsavel;
}
