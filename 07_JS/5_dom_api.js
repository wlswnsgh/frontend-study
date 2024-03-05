// querySelector('CSS 선택자') :HTML요소를 선택할 수 있는 명령어
// HTML에서 해당요소를 검색하여 찾은 첫 번째 요소 하나만 반환
// 요소를 찾지 못하면 null값으로 반환한다.
const boxEl = document.querySelector('.box');
console.log(boxEl);

// 요소에 이벤트 리스너 등록하기
// 이벤트: 마우스(click), 스크롤(scroll), 키보드(keydown)등 다양하다.
//addEventListener() 메소드:
// 해당 요소에 지정한 이벤트(even)가 발생하는지 듣고(Listen) 있다가
// 실제 이벤트가 발생하면 연결된 콜백 함수(Handler)를 실행
boxEl.addEventListener('click', function() {
    console.log('click');

    // classList 속성: 요소의 HTML class 속성에 대한 제어 명령이 포함.
    boxEl.classList.add('active'); //요소에 active라는 클래스를 추가

    //확인하기
    let hasActive = boxEl.classList.contains('active'); //요소에 active라는 클래스 값이 있는지 확인
    console.log(hasActive);



    //제거하기
    boxEl.classList.add('active'); //요소에 active라는 클래스가 있으면 제거
    hasActive = boxEl.classList.contains('active');
    console.log(hasActive);
    // 활용 예: active라는 클래스에 머리 스타일을 지정하고 클릭한 특정 요소에 
    // 스타일을 적용할때 사용된다.
    
    
});