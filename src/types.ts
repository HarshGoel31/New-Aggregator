export type Article = {
  id: string;
  title: string;
  description?: string;
  url: string;
  image?: string;
  source: string;
  author?: string;
  publishedAt: string;
  content?: string;
  category?: string;
};

export type FilterState = {
  q?: string;
  from?: string;
  to?: string;
  sources?: string;
  categories?: string;
  authors?: string;
};
