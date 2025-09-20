import React from "react";
import ArticleCard from "./ArticleCard";
import type { Article } from "../types";

export default function ArticlesList({ articles }: { articles: Article[] }) {
  return (
    <div>
      {articles.map((a) => (
        <ArticleCard key={a.id} article={a} />
      ))}
    </div>
  );
}
