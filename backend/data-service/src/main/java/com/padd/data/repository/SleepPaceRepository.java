package com.padd.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.time.LocalDateTime;

import com.padd.data.entity.SleepPace;
import com.padd.data.entity.User;

public interface SleepPaceRepository extends JpaRepository<SleepPace, Long> {
    
    Optional<SleepPace> findByUserAndTimestamp(User user, LocalDateTime timestamp);

}
