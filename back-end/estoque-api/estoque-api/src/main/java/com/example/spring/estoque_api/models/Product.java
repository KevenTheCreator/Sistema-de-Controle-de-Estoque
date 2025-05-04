package com.example.spring.estoque_api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "tb_produtos")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String produto;

    @Column(nullable = false)
    private int quantidade;

    @Column(nullable = false)
    private String fornecedor;

    @Column(nullable = false)
    private String codigoProduto;

    @Column(nullable = false)
    private String unidadeMedida;

    @Column(nullable = false)
    private String categoria;
}
