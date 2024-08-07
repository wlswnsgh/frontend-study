import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import React, { useState } from "react";
import styled from "styled-components";
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

function PostWritePage() {
  // 글의 제목과 내용을 위한 state
  const [title, setTitle] = useState('');
  const [content, setContent] =useState('');
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        {/* 글 제목 입력 */}
          <TextInput 
            height={20}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        {/* 글 내용 입력 */}
          <TextInput 
            height = {480}
            value = {content}
            onChange = {(e) => setContent(e.target.value)}
          />
        {/* 글 등록 버튼 */}
        <Button 
          title = "글 등록"
          onClick = {() => navigate('/')}
        />
      </Container>
    </Wrapper>
  );
};

export default PostWritePage;