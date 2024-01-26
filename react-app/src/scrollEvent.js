import { useEffect, useState } from "react";
import axios from "axios";
import { throttle } from "lodash";
import "./App.css";

const PER_PAGE = 20;

function ScrollEvent() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const getPokemonList = async () => {
    setLoading(true);

    //limit: 보여줄 갯수, offset: 총 개수
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${PER_PAGE}&offset=${page}`)
      .then((res) => {
        setData(data.concat(res.data.results));
        setPage((pre) => pre + PER_PAGE);
      })
      .catch((error) => {
        alert(error);
      });

    setLoading(false);
  };

  //throttle: 지정된 주기 동안 한 번만 호출
  const handleScroll = throttle(() => {
    //scrollHeight: 화면의 높이 값
    //scrollTop: 사용자가 보는 페이지와 원래 페이지의 최상단과의 차이
    //clientHeight: 사용자가 지금 보는 높이
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    //스크롤이 페이지의 맨 아래에 도달했을 때
    if (!loading && scrollTop + clientHeight >= scrollHeight) {
      getPokemonList();
      console.log("API요청");
    }
  }, 2000);

  useEffect(() => {
    getPokemonList();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); //스크롤 이벤트 발생 시 실행
    //이벤트 발생 안했을 경우 이벤트 리스너가 제거되므로 필요! (언마운트 됐을 때)
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      {data.map((pokemon, index) => (
        <p key={index}>{pokemon.name}</p>
      ))}
    </>
  );
}

export default ScrollEvent;
