package org.padd.repository;

import org.padd.entity.SleepPace;
import org.padd.entity.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import org.jboss.logging.Logger;
import org.padd.services.HealthAnalysisService;

@ApplicationScoped
public class SleepPaceRepository implements PanacheRepository<SleepPace> {
    private static final Logger log = Logger.getLogger(HealthAnalysisService.class);
    public List<SleepPace> findByUserAndTimestampBetween(int userId, LocalDateTime startTimestamp, LocalDateTime endTimestamp) {
        Timestamp start = Timestamp.valueOf(startTimestamp);
        Timestamp end = Timestamp.valueOf(endTimestamp);
        log.info("Finding health records for user: " + userId + " between " + start + " and " + end);
        return find("user_id = ?1 and timestamp between ?2 and ?3", userId, startTimestamp, endTimestamp).list();
    }
}