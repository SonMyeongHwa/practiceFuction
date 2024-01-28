import { useEffect, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";

type Pokemon = {
  name: string;
};

const PAGE_SIZE: number = 20;

const IntersectionObserver = () => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [ref, inView] = useInView(); //inView: 화면에 보이면 true 아니면 false

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
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  useEffect(() => {
    if (inView && page > 0) {
      console.log(inView, "무한 스크롤");
      getPokemonList();
    }
  }, [inView]);

  return (
    <>
      {data.map((pokemon, index) => (
        <p key={index} ref={index === data.length - 1 ? ref : null}>{pokemon.name}</p>
      ))}
      {loading && <p>Loading...</p>}
    </>
  );
};

export default IntersectionObserver;
