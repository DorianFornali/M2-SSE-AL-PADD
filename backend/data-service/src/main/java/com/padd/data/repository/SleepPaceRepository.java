package com.padd.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.padd.data.entity.SleepPace;

public interface SleepPaceRepository extends JpaRepository<SleepPace, Long> {
    
}
