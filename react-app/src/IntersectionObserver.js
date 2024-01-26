import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import styled from "styled-components";

function IntersectionObserver() {
  const [items, setItems] = useState([]); // 데이터
  const [page, setPage] = useState(1); // 페이지
  const [ref, inView] = useInView(); //inView: 화면에 보이면 true 아니면 false
  const [loading, setLoading] = useState(false);

  const fetchItems = () => {
    setLoading(true);
    axios
      .get(
        `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`
      )
      .then((res) => {
        setItems((prevItems) => [...prevItems, ...res.data]);
        setPage((prev) => prev + 1);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (inView && page > 1) {
      console.log(inView, "무한 스크롤 요청");
      fetchItems();
    }
  }, [inView]);

  // 초기 렌더링 시 데이터 로드
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Container>
      {items.map((item, index) => (
        // 맨 아래 요소가 화면에 보이는 여부에 따라 isView가 변경
        <Text key={index} ref={index === items.length - 1 ? ref : null}>
          {item.email}
        </Text>
      ))}
      {loading && <Loading>Loading...</Loading>}
    </Container>
  );
}

export default IntersectionObserver;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  width: 350px;
  height: 40px;
  background-color: #fefefe;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  margin: 10px 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.div`
  margin: 10px 5px;

  color: #ff7676;
`;
