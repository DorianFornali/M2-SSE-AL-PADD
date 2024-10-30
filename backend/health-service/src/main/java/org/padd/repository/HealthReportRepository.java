package org.padd.repository;

import jakarta.enterprise.context.ApplicationScoped;
import org.padd.entity.HealthReport;
import org.padd.entity.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class HealthReportRepository implements PanacheRepository<HealthReport> {
}
