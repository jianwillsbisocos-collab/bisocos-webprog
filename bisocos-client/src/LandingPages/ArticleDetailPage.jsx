import { useParams } from "react-router-dom";
import Button from "../components/Button.jsx";
import { useEffect, useState } from "react";
import { fetchArticles } from "../services/ArticleService";

const ArticleDetailPage = () => {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await fetchArticles();
        const list = data?.articles || [];
        const found = list.find((a) => a.name === name);
        setArticle(found || null);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [name]);


  if (loading) {
    return <div className="text-zinc-700">Loading article...</div>;
  }

  if (error) {
    return <div className="text-red-600">Failed to load article.</div>;
  }

  if (!article) {
    return <div className="text-red-600">Article not found</div>;
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-900">
          {article.label || article.title || "Kitchen Article"}
        </p>
        <h1 className="max-w-2xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          {article.title}
        </h1>
        <div className="mt-6">
          <Button to="/articles">← Back to Articles</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-[1.25rem] mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="h-64 w-full object-cover"
            />
          </div>
          <div className="prose prose-zinc max-w-none">
            {article.content.map((paragraph, index) => (
              <p key={index} className="mt-6 text-base leading-7 whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleDetailPage;
