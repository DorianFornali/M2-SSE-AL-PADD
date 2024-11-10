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


    private String getHeartRateState(double avgHeartRate) {
        if (avgHeartRate < 70) return "Very Good";
        if (avgHeartRate < 100) return "Good";
        if (avgHeartRate < 110) return "Bad";
        return "Very Bad";
    }

    private String getStressLevelState(int avgStressLevel) {
        if (avgStressLevel < 30) return "Very Good";
        if (avgStressLevel < 50) return "Good";
        if (avgStressLevel < 90) return "Bad";
        return "Very Bad";
    }

    public String determineGeneralState(double avgHeartRate, int avgStressLevel) {
        String heartRateState = getHeartRateState(avgHeartRate);
        String stressLevelState = getStressLevelState(avgStressLevel);

        if (heartRateState.equals("Very Bad") || stressLevelState.equals("Very Bad")) {
            return "Very Bad";
        }
        if (heartRateState.equals("Bad") || stressLevelState.equals("Bad")) {
            return "Bad";
        }

        if (heartRateState.equals("Good") && stressLevelState.equals("Good")) {
            return "Good";
        }
        return "Very Good";
    }


    public void analyzeHealthAndSleep(User user, LocalDateTime startTimestamp, LocalDateTime endTimestamp) {
        System.out.println("Analyzing health and sleep data for user: " + user.getEmail());
        List<HealthRecord> healthRecords = healthRecordRepository.findByUserAndTimestampBetween(user.getId(), startTimestamp, endTimestamp);
        List<SleepPace> sleepPaces = sleepPaceRepository.findByUserAndTimestampBetween(user.getId(), startTimestamp, endTimestamp);

        if (!healthRecords.isEmpty() && !sleepPaces.isEmpty()) {

            /* Some basic computations (need to add more analysis) */
            double averageHeartRate = healthRecords.stream().mapToDouble(HealthRecord::getHeartRate).average().orElse(0.0);
            double maxHeartRate = healthRecords.stream().mapToDouble(HealthRecord::getHeartRate).max().orElse(0.0);
            double minHeartRate = healthRecords.stream().mapToDouble(HealthRecord::getHeartRate).min().orElse(0.0);

            int averageStressLevel = (int) healthRecords.stream().mapToInt(HealthRecord::getStressLevel).average().orElse(0.0);
            int maxStressLevel = healthRecords.stream().mapToInt(HealthRecord::getStressLevel).max().orElse(0);
            int minStressLevel = healthRecords.stream().mapToInt(HealthRecord::getStressLevel).min().orElse(0);

            /* Sleep pace treatement */
            int totalSleepDuration = sleepPaces.stream().mapToInt(SleepPace::getSleepDuration).sum();
            int maxSleepDuration = sleepPaces.stream().mapToInt(SleepPace::getSleepDuration).max().orElse(0);
            int minSleepDuration = sleepPaces.stream().mapToInt(SleepPace::getSleepDuration).min().orElse(0);

            /* Construct the health report and store in the database */
            HealthReport report = new HealthReport();
            report.setUser(user);
            // The period of the report 
            report.setStartTimestamp(startTimestamp);
            report.setEndTimestamp(endTimestamp);
            report.setAverageHeartRate(averageHeartRate);
            report.setTotalSleepDuration(totalSleepDuration);
            report.setAverageStressLevel(averageStressLevel);
            report.setMaxHeartRate(maxHeartRate);
            report.setMinHeartRate(minHeartRate);
            report.setMaxStressLevel(maxStressLevel);
            report.setMinStressLevel(minStressLevel);
            report.setMaxSleepDuration(maxSleepDuration);
            report.setMinSleepDuration(minSleepDuration);
            report.setGeneralState(determineGeneralState(averageHeartRate, averageStressLevel));
            healthReportRepository.persist(report);

            log.info("Health report saved for user: " + user.getEmail());

        } else {
            log.warn("No health or sleep data found for user: " + user.getEmail() + " at timestamp: " + startTimestamp + " - " + endTimestamp);
        }
    }
}