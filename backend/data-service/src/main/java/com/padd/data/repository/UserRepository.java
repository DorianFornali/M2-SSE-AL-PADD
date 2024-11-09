package com.padd.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.padd.data.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
  Optional<User> findById(Long id);
}
