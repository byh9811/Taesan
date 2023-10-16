package com.ts.taesan.global.util;

import com.ts.taesan.domain.asset.entity.PayHistory;
import com.ts.taesan.domain.asset.entity.Tikkle;
import com.ts.taesan.domain.asset.repository.PayHistoryRepository;
import com.ts.taesan.domain.transaction.req.KakaoResult;
import com.ts.taesan.domain.transaction.req.TransactionsClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
@Slf4j
public class InterestCalculateUtil {

    private final PayHistoryRepository payHistoryRepository;

    private Double rate = 2.3;

    public long calculate(Tikkle tikkle) {
        long totalOriginalMoney = 0;
        long totalInterest = 0;
        List<PayHistory> payHistoryList = payHistoryRepository.findPayHistoriesByTikkleId(tikkle.getId());
        for (PayHistory payHistory : payHistoryList) {
            long daysDifference = ChronoUnit.DAYS.between(payHistory.getCreateDate(), LocalDateTime.now());
            long originalMoney = payHistory.getTransAmount();
            totalOriginalMoney += originalMoney;
            totalInterest += (long) (originalMoney * daysDifference / 365 * rate / 100);
        }

        if (new Date().before(tikkle.getEndDate())) {
            return totalOriginalMoney + totalInterest;
        } else {
            return totalOriginalMoney + (totalInterest/2);
        }
    }

    public long calculateFinalInterest(Tikkle tikkle) {
        long totalOriginalMoney = 0;
        long totalInterest = 0;
        List<PayHistory> payHistoryList = payHistoryRepository.findPayHistoriesByTikkleId(tikkle.getId());
        for (PayHistory payHistory : payHistoryList) {
            LocalDateTime endDate = tikkle.getEndDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
            long daysDifference = ChronoUnit.DAYS.between(payHistory.getCreateDate(), endDate);
            long originalMoney = payHistory.getTransAmount();
            totalOriginalMoney += originalMoney;
            totalInterest += (long) (originalMoney * daysDifference / 365 * rate / 100);
        }

        if (new Date().before(tikkle.getEndDate())) {
            return totalOriginalMoney + totalInterest;
        } else {
            return totalOriginalMoney + (totalInterest/2);
        }
    }

}
