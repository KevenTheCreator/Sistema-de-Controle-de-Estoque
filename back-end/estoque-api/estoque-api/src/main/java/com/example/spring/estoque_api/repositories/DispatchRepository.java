package com.example.spring.estoque_api.repositories;

import com.example.spring.estoque_api.models.Dispatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DispatchRepository extends JpaRepository<Dispatch, Long> {
}
