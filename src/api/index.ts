import { fetchFromNewsAPI } from "./newsapi";
import { fetchFromGuardian } from "./guardian";
import { fetchFromNYT } from "./nyt";
import type { Article } from "../types";

export async function fetchArticles(params: {
  q?: string;
  from?: string;
  to?: string;
  sources?: string;
  categories?: string;
  page?: number;
}): Promise<Article[]> {
  const [n, g, ny] = await Promise.all([
    fetchFromNewsAPI(params),
    fetchFromGuardian(params),
    fetchFromNYT(params),
  ]);
  const combined = [...n, ...g, ...ny];

  const map = new Map<string, Article>();
  combined.forEach((a) => map.set(a.url, a));
  return Array.from(map.values()).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
