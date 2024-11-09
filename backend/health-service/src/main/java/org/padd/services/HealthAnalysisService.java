package org.padd.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import org.padd.entity.HealthRecord;
import org.padd.entity.SleepPace;
import org.padd.entity.User;
import org.padd.entity.HealthReport;
import org.padd.repository.HealthRecordRepository;
import org.padd.repository.SleepPaceRepository;
import org.padd.repository.HealthReportRepository;

import org.jboss.logging.Logger;

import java.time.LocalDateTime;
import java.util.List;

@ApplicationScoped
public class HealthAnalysisService {

    private static final Logger log = Logger.getLogger(HealthAnalysisService.class);

    @Inject
    HealthRecordRepository healthRecordRepository;

    @Inject
    SleepPaceRepository sleepPaceRepository;

    @Inject
    HealthReportRepository healthReportRepository;

    public void analyzeHealthAndSleep(User user, LocalDateTime startTimestamp, LocalDateTime endTimestamp) {
        System.out.println("Analyzing health and sleep data for user: " + user.getEmail());
        List<HealthRecord> healthRecords = healthRecordRepository.findByUserAndTimestampBetween(user.getId(), startTimestamp, endTimestamp);
        List<SleepPace> sleepPaces = sleepPaceRepository.findByUserAndTimestampBetween(user.getId(), startTimestamp, endTimestamp);

        if (!healthRecords.isEmpty() && !sleepPaces.isEmpty()) {

            /* Some basic computations (need to add more analysis) */
            double averageHeartRate = healthRecords.stream().mapToDouble(HealthRecord::getHeartRate).average().orElse(0.0);
            int averageStressLevel = (int) healthRecords.stream().mapToInt(HealthRecord::getStressLevel).average().orElse(0.0);


            /* Sleep pace treatement */
            int totalSleepDuration = sleepPaces.stream().mapToInt(SleepPace::getSleepDuration).sum();

            log.info("Average Heart Rate: " + averageHeartRate);
            log.info("Total Sleep Duration: " + totalSleepDuration);
            log.info("Average Stress Level: " + averageStressLevel);

            /* Construct the health report and store in the database */
            HealthReport report = new HealthReport();
            report.setUser(user);
            // The period of the report 
            report.setStartTimestamp(startTimestamp);
            report.setEndTimestamp(endTimestamp);
            report.setAverageHeartRate(averageHeartRate);
            report.setTotalSleepDuration(totalSleepDuration);
            report.setAverageStressLevel(averageStressLevel);
            healthReportRepository.persist(report);

            log.info("Health report saved for user: " + user.getEmail());

        } else {
            log.warn("No health or sleep data found for user: " + user.getEmail() + " at timestamp: " + startTimestamp + " - " + endTimestamp);
        }
    }
}