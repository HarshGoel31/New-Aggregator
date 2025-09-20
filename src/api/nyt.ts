import axios from "axios";
import type { Article } from "../types";

const KEY = import.meta.env.VITE_NYT_KEY;

export async function fetchFromNYT(params: any): Promise<Article[]> {
  if (!KEY) return [];

  const { q, from, to, categories } = params;
  let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(
    q || ""
  )}&api-key=${KEY}`;

  if (from) {
    url += `&begin_date=${from.replace(/-/g, "")}`;
  }
  if (to) {
    url += `&end_date=${to.replace(/-/g, "")}`;
  }

  if (categories) {
    const categoryMap: Record<string, string> = {
      general: 'section_name:("General") OR news_desk:("General")',
      politics: 'section_name:("Politics") OR news_desk:("Politics")',
      business: 'section_name:("Business") OR news_desk:("Business")',
      technology: 'section_name:("Technology") OR news_desk:("Technology")',
      sports: 'section_name:("Sports") OR news_desk:("Sports")',
      health: 'section_name:("Health") OR news_desk:("Health")',
    };
    if (categoryMap[categories]) {
      url += `&fq=${encodeURIComponent(categoryMap[categories])}`;
    }
  }

  const res = await axios.get(url);
  const docs = res.data.response?.docs || [];

  return docs.map((d: any, idx: number) => {
    let imageUrl: string | undefined;
    if (d.multimedia) {
      if (d.multimedia.default?.url) {
        imageUrl = d.multimedia.default.url;
      } else if (d.multimedia.thumbnail?.url) {
        imageUrl = d.multimedia.thumbnail.url;
      }
    }

    return {
      id: `nyt-${d._id || idx}`,
      title: d.headline?.main,
      description: d.abstract || d.lead_paragraph,
      url: d.web_url,
      image: imageUrl,
      source: "NYTimes",
      author: d.byline?.original,
      publishedAt: d.pub_date,
      content: d.lead_paragraph,
      category: d.section_name?.toLowerCase() || "",
    };
  });
}
