import axios from "axios";
import type { Article } from "../types";

const KEY = import.meta.env.VITE_NEWSAPI_KEY;

export async function fetchFromNewsAPI(params: any): Promise<Article[]> {
  if (!KEY) return [];

  const { from, to, q, categories } = params;
  let url: string;

  if (!q?.trim()) {
    url = `https://newsapi.org/v2/everything?q=news&pageSize=50&apiKey=${KEY}`;
  } else {
    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      q
    )}&pageSize=50&apiKey=${KEY}`;
  }

  if (from) url += `&from=${from}`;
  if (to) url += `&to=${to}`;
  // if (categories) url += `&category=${categories}`;

  const res = await axios.get(url);
  return (res.data.articles || []).map((a: any, idx: number) => ({
    id: `newsapi-${idx}`,
    title: a.title,
    description: a.description,
    url: a.url,
    image: a.urlToImage,
    source: a.source?.name || "NewsAPI", // normalized source
    author: a.author,
    publishedAt: a.publishedAt,
    content: a.content || a.description,
    category: categories?.length ? categories : "general", // fallback category
  }));
}
