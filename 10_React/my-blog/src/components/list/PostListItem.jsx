import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom"
import data from "../../data.json"
const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  justify-content: center;
  border: 1px solid grey;
  border-radius: 8px;
  background: white;
  cursor: pointer;

  &:hover {
    background: lightgrey;
  }
`;

const TitleText = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

function PostListItem(props) {
  const { post: { id, title } } = props;

  const navigate = useNavigate();
  return (
    <Wrapper onClick={() => }>
    <TitleText>{title}</TitleText>
    </Wrapper>
  );
};

export default PostListItem;