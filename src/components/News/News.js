import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Typography,
} from "@material-ui/core";

function News(props) {
  const [news, setNews] = useState([]);
  const [total, setTotal] = useState(0);
  const getNews = async () => {
    fetch(
      "https://newsapi.org/v2/everything?q=covid19&sortBy=popularity&apiKey=560c5ed658a542379abfbf288c7a80a0"
    )
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles);
        setTotal(data.totalResults);
      });
  };

  useEffect(() => {
    getNews();
  }, []);
  return (
    <div>
      <h1 className="heading">News</h1>
      <h2 className="heading2">Top 10 Headlines:</h2>
      {news.slice(0,10).map((article) => (
        <Card className="news">
            <div className="news__header">
                <div className="news__header__img">
                    <CardMedia component="img" height="150" image={article.urlToImage} alt={article.title} />
                </div>
                <div>
                  <CardHeader title={article.title} subheader={article.author} />
                  <Typography variant="body2" color="textSecondary" component="p">Published on: {article.publishedAt.substring(0,10)}</Typography>
                </div>
            </div>
          <CardContent>
            <a target="_blank" rel="noreferer" href={article.url}>Visit</a>
          </CardContent>
            
        </Card>
      ))}
    </div>
  );
}

export default News;
