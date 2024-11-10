package org.padd.repository;

import jakarta.enterprise.context.ApplicationScoped;
import org.padd.entity.HealthReport;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class HealthReportRepository implements PanacheRepository<HealthReport> {
}
