package com.padd.data.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;

import com.padd.data.entity.HealthRecord;
import com.padd.data.entity.User;

public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long>{

    Optional<HealthRecord> findByUserAndTimestamp(User user, LocalDateTime timestamp);

}
