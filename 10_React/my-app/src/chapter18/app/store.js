import { configureStore } from "@reduxjs/toolkit";

// 1. Redux Store 만들기 (app/store.js)
// 전역 state를 보관하는 저장소
// configureStore를 쓰면 Redux Devtools 설정이 자동으로 추가됨
// (But, Redux Devtools는 크롬 웹 스토어에서 따로 설치 필요!)
configureStore();