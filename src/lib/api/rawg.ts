import type { Result, SearchGame } from "../../interfaces/gameData";
import type { Category, ResultCategory } from "../../interfaces/categoryData";
import { getCachedData } from "./cacheRawg";
import type { slugData } from "../../interfaces/slugData";
import type { ScreenShoot } from "../../interfaces/screenShotsData";

const API_KEY = import.meta.env.RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

async function fetchFromRAWG(endpoint: string) {
  const response = await fetch(
    `${BASE_URL}${endpoint}&key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`RAWG API error: ${response.status}`);
  }

  return response.json();
}

export async function getTrendingGames() {
  return getCachedData(
    `treding-games`,
    1000 * 60 * 60 * 60,
    async () => {
      const data = await fetchFromRAWG("/games?dates=2026-07-02,2027-07-02&ordering=-added&page_size=5")
      
      const { results } = data as { results: Result[]}

      return results
    },
  );
}

export async function getAllGames(page:number) {
  return getCachedData(
    `home-games-${page}`,
    1000 * 60 * 60 * 60,
     async () => {
     const data = await fetchFromRAWG(`/games?ordering=-added&page=${page}&page_size=20`)

     const {results} = data as {results: Result[]}

     return results
   }
  )
}

export async function getCategories() {
  return getCachedData(
    "categories",
    1000 * 60 * 60 * 60, // 60 horas
    async () => {
      const data = await fetchFromRAWG("/genres?");

      const { results } = data as {
        results: ResultCategory[];
      };

      return results;
    }
  );
}

export async function getGameBySlug(slug:string) {

  const data = await fetchFromRAWG(`/games/${slug}?`);


  const slugData = data as slugData;

  return slugData;
}

export async function getScreenShots(slug:string) {
  const data = await fetchFromRAWG(`/games/${slug}/screenshots?`);

  const screenData = data as ScreenShoot;

  return screenData.results;
}

export async function searchGames(query:string,page: number) {

  return getCachedData(
    `search-${query}-${page}`,
    1000 * 60 * 60, //10 Minutos
    async () => {

      if(query.trim().length < 3){
        return {
          results: [],
          count: 0
        }
      }
      
      const data = await fetchFromRAWG(`/games?search=${encodeURIComponent(query)}&page=${page}`);

      const searchGamesData = data as SearchGame

      return searchGamesData

    }
  )
  
}


 export async function getCategoryGames(query:string) {

  
    return getCachedData(
      `category-${query}`,
      1000 * 60 * 60 * 60,
      async () => {

        const data = await fetchFromRAWG(`/games?genres=${query}`);

        const categoryGames = data as SearchGame

        return categoryGames;
      }

    )
  }