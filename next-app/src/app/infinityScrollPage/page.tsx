"use client"
import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

type PokemonList = {
  results: any;
  name: string;
  url: string;
};

const itemsPerPage = 20;

const fetchPokemonList = async ({ pageParam = itemsPerPage }: QueryFunctionContext) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${pageParam * itemsPerPage}`);
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to fetch Pokemon list");
  }
};

const InfinityScrollPage = () => {
  const {
    data, //data.pages를 갖고 있는 배열
    fetchNextPage, //다음 페이지를 불러오는 함수
    hasNextPage, //다음 페이지가 있는지 여부, Boolean
    isFetchingNextPage, //추가 페이지 fetching 여부, Boolean
    isError,
    error, //error 객체
    status, //loadgin, error, success 중 하나의 상태, String
  } = useInfiniteQuery<PokemonList, Error>(
    ["pokemonList"], // 쿼리 키
    fetchPokemonList, // API 호출 함수
    {
      getNextPageParam: (lastPage: any, allPages: any) => {
        const lastPageNumber = allPages.length * itemsPerPage;
        return lastPageNumber < lastPage.length ? lastPageNumber + itemsPerPage : undefined;
      },
    }
  );

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }
  console.log(data);

  return (
    <div>
      {data?.pages?.map((group, index) => (
        <div key={index}>
          {group?.results?.map((pokemon: any) => (
            <p key={pokemon.name}>{pokemon.name}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default InfinityScrollPage;
