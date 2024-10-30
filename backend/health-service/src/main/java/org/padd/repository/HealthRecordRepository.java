package org.padd.repository;

import org.padd.entity.HealthRecord;
import org.padd.entity.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class HealthRecordRepository implements PanacheRepository<HealthRecord> {
    public List<HealthRecord> findByUserAndTimestampBetween(User user, LocalDateTime startTimestamp, LocalDateTime endTimestamp) {
        return find("user = ?1 and timestamp between ?2 and ?3", user, startTimestamp, endTimestamp).list();
    }
}