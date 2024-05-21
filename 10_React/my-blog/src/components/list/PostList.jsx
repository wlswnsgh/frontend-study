import styled from "styled-components";
import React, { useState } from "react";
import PostListItem from "./PostListItem";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  justify-content: center;

  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`;

function PostList(props) {
  const { posts } = props;
  return (
    <Wrapper>
      {/* Quiz: posts 배열을 반복 렌더링하기 */}
      {posts.map((post) => {
        return <PostListItem key = {post.id} post={post} />
      })}
    </Wrapper>
  );
};

export default PostList;