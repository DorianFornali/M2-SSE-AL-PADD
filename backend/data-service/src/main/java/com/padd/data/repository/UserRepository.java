package com.padd.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.padd.data.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
    
}
