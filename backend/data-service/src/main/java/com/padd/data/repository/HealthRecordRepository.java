package com.padd.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.padd.data.entity.HealthRecord;

public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long>{
    
}
