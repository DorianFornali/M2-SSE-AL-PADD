package org.padd.repository;

import org.padd.entity.SleepPace;
import org.padd.entity.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.LocalDateTime;
import java.util.List;

@ApplicationScoped
public class SleepPaceRepository implements PanacheRepository<SleepPace> {
    public List<SleepPace> findByUserAndTimestampBetween(User user, LocalDateTime startTimestamp, LocalDateTime endTimestamp) {
        return find("user = ?1 and timestamp between ?2 and ?3", user, startTimestamp, endTimestamp).list();
    }
}