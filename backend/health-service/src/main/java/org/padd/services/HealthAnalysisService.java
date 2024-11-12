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

    private String getBodyTemperatureLevelState(double avgBodyTemperature) {
        if (avgBodyTemperature < 36.5) return "Very Good";
        if (avgBodyTemperature < 37.5) return "Good";
        if (avgBodyTemperature < 38.5) return "Bad";
        return "Very Bad";
    }

    private String getBloodOxygenationLevelState(double avgBloodOxygenation) {
        if (avgBloodOxygenation > 95) return "Very Good";
        if (avgBloodOxygenation > 90) return "Good";
        if (avgBloodOxygenation > 85) return "Bad";
        return "Very Bad";
    }

    public String determineGeneralState(double avgHeartRate, int avgStressLevel, double avgBodyTemperature, double avgBloodOxygenation) {
        String heartRateState = getHeartRateState(avgHeartRate);
        String stressLevelState = getStressLevelState(avgStressLevel);
        String bodyTemperatureState = getBodyTemperatureLevelState(avgBodyTemperature);
        String bloodOxygenationState = getBloodOxygenationLevelState(avgBloodOxygenation);


        if (heartRateState.equals("Very Bad") || stressLevelState.equals("Very Bad") || bodyTemperatureState.equals("Very Bad") || bloodOxygenationState.equals("Very Bad")) {
            return "Very Bad";
        }
        if (heartRateState.equals("Bad") || stressLevelState.equals("Bad") || bodyTemperatureState.equals("Bad") || bloodOxygenationState.equals("Bad")) {
            return "Bad";
        }

        if (heartRateState.equals("Good") && stressLevelState.equals("Good") && bodyTemperatureState.equals("Good") && bloodOxygenationState.equals("Good")) {
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

            double averageBodyTemperature = healthRecords.stream().mapToDouble(HealthRecord::getBodyTemperature).average().orElse(0.0);
            double maxBodyTemperature = healthRecords.stream().mapToDouble(HealthRecord::getBodyTemperature).max().orElse(0.0);
            double minBodyTemperature = healthRecords.stream().mapToDouble(HealthRecord::getBodyTemperature).min().orElse(0.0);

            double averageBloodOxygenation = healthRecords.stream().mapToDouble(HealthRecord::getBloodOxygenation).average().orElse(0.0);
            double maxBloodOxygenation = healthRecords.stream().mapToDouble(HealthRecord::getBloodOxygenation).max().orElse(0.0);
            double minBloodOxygenation = healthRecords.stream().mapToDouble(HealthRecord::getBloodOxygenation).min().orElse(0.0);

            /* Sleep pace treatement */
            int totalSleepDurationInMinutes = sleepPaces.stream().mapToInt(SleepPace::getSleepDuration).sum();
            int maxSleepDuration = sleepPaces.stream().mapToInt(SleepPace::getSleepDuration).max().orElse(0);
            int minSleepDuration = sleepPaces.stream().mapToInt(SleepPace::getSleepDuration).min().orElse(0);

            double totalSleepDurationInHours = totalSleepDurationInMinutes / 60.0;

            /* Construct the health report and store in the database */
            HealthReport report = new HealthReport();
            report.setUser(user);
            // The period of the report 
            report.setStartTimestamp(startTimestamp);
            report.setEndTimestamp(endTimestamp);
            report.setAverageHeartRate(averageHeartRate);
            report.setTotalSleepDuration(totalSleepDurationInHours);
            report.setAverageStressLevel(averageStressLevel);
            report.setMaxHeartRate(maxHeartRate);
            report.setMinHeartRate(minHeartRate);
            report.setMaxStressLevel(maxStressLevel);
            report.setMinStressLevel(minStressLevel);
            report.setAverageBodyTemperature(averageBodyTemperature);
            report.setMaxBodyTemperature(maxBodyTemperature);
            report.setMinBodyTemperature(minBodyTemperature);
            report.setAverageBloodOxygenation(averageBloodOxygenation);
            report.setMaxBloodOxygenation(maxBloodOxygenation);
            report.setMinBloodOxygenation(minBloodOxygenation);


            report.setMaxSleepDuration(maxSleepDuration);
            report.setMinSleepDuration(minSleepDuration);
            report.setGeneralState(determineGeneralState(averageHeartRate, averageStressLevel, averageBodyTemperature, averageBloodOxygenation));
            healthReportRepository.persist(report);

            log.info("Health report saved for user: " + user.getEmail());

        } else {
            log.warn("No health or sleep data found for user: " + user.getEmail() + " at timestamp: " + startTimestamp + " - " + endTimestamp);
        }
    }
}