// components/BlogSidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Article {
  title: string;
  date: string;
  slug: string;
  description: string;
}

interface BlogSidebarProps {
  articles: Article[];
  currentSlug?: string;
}

function groupArticlesByYearAndMonth(articles: Article[]) {
  return articles.reduce(
    (years: { [key: string]: { [key: string]: Article[] } }, article) => {
      const date = new Date(article.date);
      const year = date.getFullYear().toString();
      const month = date.toLocaleString("default", { month: "long" });

      if (!years[year]) {
        years[year] = {};
      }
      if (!years[year][month]) {
        years[year][month] = [];
      }
      years[year][month].push(article);
      return years;
    },
    {},
  );
}

export default function BlogSidebar({
  articles,
  currentSlug,
}: BlogSidebarProps) {
  const groupedArticles = groupArticlesByYearAndMonth(articles);
  const [expandedYears, setExpandedYears] = useState<{
    [key: string]: boolean;
  }>(() => {
    // Initially expand the current year
    const currentYear = new Date().getFullYear().toString();
    return { [currentYear]: true };
  });
  const [expandedMonths, setExpandedMonths] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  const toggleMonth = (yearMonth: string) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [yearMonth]: !prev[yearMonth],
    }));
  };

  return (
    <aside className="w-64 pr-6 border-r border-cLineBreak hidden lg:block">
      <nav>
        <h2 className="markdown-h2 mb-4">Articles</h2>
        {Object.entries(groupedArticles)
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .map(([year, months]) => (
            <div key={year} className="mb-4">
              <button
                onClick={() => toggleYear(year)}
                className="bg-cBg border-none drop-shadow-none flex items-center w-full text-left markdown-h3 hover:text-cLink transition-colors"
              >
                {expandedYears[year] ? (
                  <ChevronDown className="w-4 h-4 mr-1" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-1" />
                )}
                {year}
              </button>

              {expandedYears[year] && (
                <div className="ml-2">
                  {Object.entries(months)
                    .sort(([monthA], [monthB]) => {
                      const monthOrder = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ];
                      return (
                        monthOrder.indexOf(monthB) - monthOrder.indexOf(monthA)
                      );
                    })
                    .map(([month, monthArticles]) => (
                      <div key={`${year}-${month}`} className="ml-2 mb-2">
                        <button
                          onClick={() => toggleMonth(`${year}-${month}`)}
                          className="bg-cBg border-none drop-shadow-none flex items-center w-full text-left markdown-h4 hover:text-cLink transition-colors"
                        >
                          {expandedMonths[`${year}-${month}`] ? (
                            <ChevronDown className="w-3 h-3 mr-1" />
                          ) : (
                            <ChevronRight className="w-3 h-3 mr-1" />
                          )}
                          {month}
                        </button>

                        {expandedMonths[`${year}-${month}`] && (
                          <ul className="bg-cBg ml-4 space-y-2 mt-1">
                            {monthArticles.map((article) => (
                              <li key={article.slug}>
                                <Link
                                  href={`/articles/${article.slug}`}
                                  className={`markdown-link text-sm ${
                                    currentSlug === article.slug
                                      ? "text-cLink font-semibold"
                                      : ""
                                  }`}
                                >
                                  {article.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
      </nav>
    </aside>
  );
}
