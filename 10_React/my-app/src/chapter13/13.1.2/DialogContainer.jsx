import Dialog from "./Dialog";

// WelcomeDialog를 범용적인 Dialog로 리팩터링
function DialogContainer() {
  return (
    <>
      {/* WelcomeDialog */}
      <Dialog 
        title = "어서오세요."
        message = "저희 우주선을 찾아주셔서 감사합니다."
        color = "blue"
      />

      {/* AlertDialog */}
      <Dialog 
        title = "경고합니다."
        message = "관계자 외 출입을 금지합니다!"
        color = "lightblue"
      />

      <Dialog 
        title = "주의합니다."
        message = "출입을 할 시 에티켓을 지켜주세요."
        color = "red"
      />
    </>
  );
};

export default DialogContainer;