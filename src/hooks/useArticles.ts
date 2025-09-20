import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import type { Article, FilterState } from "../types";

export function useArticles(filters: FilterState) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    // ✅ Only send fetch-relevant params
    const fetchFilters = {
      q: filters.q,
      from: filters.from,
      to: filters.to,
      sources: filters.sources ?? "",
      categories: filters.categories ?? "",
    };

    fetchArticles(fetchFilters)
      .then((res) => {
        if (cancelled) return;

        let filtered = res;
        setArticles(filtered);
      })
      .catch((e) => {
        if (!cancelled) setError((e as Error).message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [filters.q, filters.from, filters.to, filters.categories]);

  useEffect(() => {
    if (filters?.sources) {
      let cancelled = false;
      setLoading(true);
      setError(null);

      let filtered = articles;

      console.log(filters, filtered, "filters");
      if (filters.sources === "newsapi") {
        filtered = filtered.filter((a) => a.id.split("-")[0] === "newsapi");
      } else if (filters.sources === "theguardian") {
        filtered = filtered.filter((a) => a.id.split("-")[0] === "guardian");
      } else if (filters.sources === "nytimes") {
        filtered = filtered.filter((a) => a.id.split("-")[0] === "nyt");
      }
      setFilteredArticles(filtered);
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }
  }, [filters.sources]);

  return { articles, filteredArticles, loading, error };
}
