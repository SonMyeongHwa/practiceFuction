import { useEffect, useState } from 'react'
import axios from 'axios';
import { throttle } from "lodash";

type Pokemon = {
  name: string;
}

const PAGE_SIZE: number = 20;

const ScrollEvent = () => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getPokemonList = () => {
    setLoading(true);

    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${page}`)
      .then((res) => {
        setData((preData) => preData.concat(res.data.results));
        setPage((prePage) => prePage + PAGE_SIZE);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleScroll = throttle(() => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    if (!loading && scrollTop + clientHeight >= scrollHeight) {
      getPokemonList();
      console.log("API 요청");
    }
  }, 2000);

  useEffect(() => {
    getPokemonList();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  })


  return (
    <>
      {data.map((pokemon, index) => (
        <p key={index}>{pokemon.name}</p>
      ))}
      {loading && <p style={{color: "red"}}>Loading................................</p>}
    </>
  );
}

export default ScrollEvent;