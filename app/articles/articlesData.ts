import raw from "./articles.json";

export type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
};

export const articles: Article[] = raw as Article[];

export function sortedArticles(list: Article[] = articles): Article[] {
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}
