import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "./Button";
import fallbackArticles from "../assets/styles/article-content.js";
import { fetchArticles } from "../services/ArticleService";

const ArticleList = () => {
  const [articles, setArticles] = useState(fallbackArticles);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const { data } = await fetchArticles();
        const backendArticles = data?.articles || [];
        if (backendArticles.length) setArticles(backendArticles);
      } catch {
        setArticles(fallbackArticles);
      }
    };

    loadArticles();
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {articles.map((article, index) => (
        <article
          key={article.name}
          className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4"
        >
          {article.image ? (
            <div className="overflow-hidden rounded-[1.25rem]">
              <img
                src={article.image}
                alt={article.title}
                className="h-48 w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center rounded-[1.25rem] bg-zinc-900 px-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white">
              {article.category || article.label || "Article"}
            </div>
          )}
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Article {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-900">
            {article.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            {article.desc || article.content?.[0]}
          </p>
          <Button as={Link} to={`/articles/${article.name}`} className="mt-4">
            Read More
          </Button>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
