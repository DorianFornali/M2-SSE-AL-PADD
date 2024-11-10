package org.padd.repository;

import org.padd.entity.HealthRecord;
import org.padd.entity.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.sql.Timestamp;
import org.jboss.logging.Logger;
import org.padd.services.HealthAnalysisService;

@ApplicationScoped
public class HealthRecordRepository implements PanacheRepository<HealthRecord> {

    private static final Logger log = Logger.getLogger(HealthAnalysisService.class);
    public List<HealthRecord> findByUserAndTimestampBetween(int userId, LocalDateTime startTimestamp, LocalDateTime endTimestamp) {
        return find("user.id = ?1 and timestamp between ?2 and ?3", userId, startTimestamp, endTimestamp).list();
    }
}