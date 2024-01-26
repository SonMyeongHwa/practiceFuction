import { useEffect, useState } from 'react';
import axios from 'axios';
import { throttle } from "lodash";
import './App.css';

const PER_PAGE = 20;

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const pokemonList = async () => {
    setLoading(true);

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
  }

  const handleScroll = throttle(() => {
    //scrollHeight: 화면의 높이 값
    //scrollTop: 사용자가 보는 페이지와 원래 페이지의 최상단과의 차이
    //clientHeight: 사용자가 지금 보는 높이
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    if (!loading && scrollTop + clientHeight >= scrollHeight) {
      pokemonList();
      console.log("API요청");
    }
  }, 3000);

  useEffect(() => {
    pokemonList();
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
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

export default App;
