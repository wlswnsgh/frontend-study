import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 720px;

  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const PostContainer = styled.div`
  padding: 8px 16px;
  border: 1px solid grey;
  border-radius: 8px;
`;

const TitleText = styled.p`
  font-size: 28px;
  font-weight: 500;
`;

const ContentText = styled.p`
  font-size: 20px;
  line-height: 32px;
`;

const CommentLabel = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

function PostViewPage() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Container>
        <Button 
          title = "뒤로가기"
          onClick = {() => navigate('/')}
        />
        <PostContainer>
          {/* 데이터 바인딩 */}
          <TitleText></TitleText>
          <ContentText></ContentText>
          <CommentLabel>댓글</CommentLabel>
          {/* 댓글 리스트 */}
          {/* 댓글 입력 */}
          {/* 댓글 등록 버튼 */}

          
        </PostContainer>
      </Container>
    </Wrapper>
  );
};

export default PostViewPage;