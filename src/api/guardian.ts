import axios from "axios";
import type { Article } from "../types";

const KEY = import.meta.env.VITE_GUARDIAN_KEY;

export async function fetchFromGuardian(params: any): Promise<Article[]> {
  if (!KEY) return [];

  const { from, to, q, categories } = params;
  let url = `https://content.guardianapis.com/search?q=${encodeURIComponent(
    q || ""
  )}&api-key=${KEY}&show-fields=thumbnail,bodyText,byline&page-size=50`;

  if (categories) url += `&section=${categories}`;
  if (from) url += `&from-date=${from}`;
  if (to) url += `&to-date=${to}`;

  const res = await axios.get(url);
  const results = res.data.response.results || [];

  return results.map((r: any) => ({
    id: `guardian-${r.id}`,
    title: r.webTitle,
    description: r.fields?.bodyText?.slice(0, 250),
    url: r.webUrl,
    image: r.fields?.thumbnail,
    source: "The Guardian", // normalized source
    author: r.fields?.byline,
    publishedAt: r.webPublicationDate,
    content: r.fields?.bodyText,
    category: r.sectionName?.toLowerCase() || "", // normalized category
  }));
}
