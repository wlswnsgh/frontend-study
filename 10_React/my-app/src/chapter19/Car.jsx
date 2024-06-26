import React from 'react';
import Styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Container = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 73vh;
`;

const StyledTable = Styled(Table)`
    width: 100%;
    max-width: 2000px;
    margin-bottom: 20px; /* 테이블과 버튼 사이 여백 조정 */
    border-collapse: collapse;

    th, td {
        text-align: center;
        padding: 10px;
        border: 1px solid #ccc;
        width: 120px;
        height: 65px;
    }

    th {
        background-color: #f0f0f0;
    }
`;

const ReservationButtonWrapper = Styled.div`
    display: flex;
    justify-content: center;
`;

const ReservationButton = Styled(Button)`
    width: 150px;
    height: 40px; 
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
        color: #fff;
    }
`;

function Car() {

    const navigate = useNavigate();

    return (    
        <Container>
            <StyledTable responsive="xl" size="md">
                <thead>
                    <tr>
                        <th colSpan={7}>A 주차구역</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>A-1</td>
                        <td>A-2</td>
                        <td>A-3</td>
                        <td>A-4</td>
                        <td>A-5</td>
                        <td>A-6</td>
                        <td>A-7</td>
                    </tr>
                    <tr>
                        <td>A-8</td>
                        <td>A-9</td>
                        <td>A-10</td>
                        <td>A-11</td>
                        <td>A-12</td>
                        <td>A-13</td>
                        <td>A-14</td>
                    </tr>
                </tbody>
            </StyledTable>

            <StyledTable responsive="xl" size="md">
                <thead>
                    <tr>
                        <th colSpan={7}>B 주차구역</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>B-1</td>
                        <td>B-2</td>
                        <td>B-3</td>
                        <td>B-4</td>
                        <td>B-5</td>
                        <td>B-6</td>
                        <td>B-7</td>
                    </tr>
                    <tr>
                        <td>B-8</td>
                        <td>B-9</td>
                        <td>B-10</td>
                        <td>B-11</td>
                        <td>B-12</td>
                        <td>B-13</td>
                        <td>B-14</td>
                    </tr>
                </tbody>
            </StyledTable>

            <ReservationButtonWrapper>
                <ReservationButton onClick={() => navigate('/management')}>예약하기</ReservationButton>
            </ReservationButtonWrapper>
        </Container>
        
    );
}

export default Car;

// 백엔드
// package com.example.scheduler;

// import org.springframework.scheduling.annotation.Scheduled;
// import org.springframework.stereotype.Component;

// import java.time.LocalDateTime;
// import java.time.format.DateTimeFormatter;
// import java.util.HashMap;
// import java.util.Map;

// @Component
// public class ParkingAvailabilityScheduler {

//     private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

//     private Map<String, Boolean> parkingAvailability = new HashMap<>();

//     public ParkingAvailabilityScheduler() {
//         // 초기 주차 공간 가용성 설정
//         initializeParkingAvailability();
//     }

//     private void initializeParkingAvailability() {
//         // 각 주차 공간의 초기 가용성 설정
//         for (int i = 1; i <= 14; i++) {
//             parkingAvailability.put("A-" + i, Math.random() < 0.5);
//             parkingAvailability.put("B-" + i, Math.random() < 0.5);
//         }
//     }

//     // 매 20분마다 주차 공간 가용성 업데이트
//     @Scheduled(cron = "0 0/20 * * * ?")
//     public void updateParkingAvailability() {
//         for (String spot : parkingAvailability.keySet()) {
//             parkingAvailability.put(spot, Math.random() < 0.5);
//         }
//         LocalDateTime now = LocalDateTime.now();
//         String formattedTime = now.format(dateTimeFormatter);
//         System.out.println("주차 공간 가용성 업데이트: " + formattedTime);
//     }

//     public Map<String, Boolean> getParkingAvailability() {
//         return parkingAvailability;
//     }
// }