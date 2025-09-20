import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Article } from "../types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default function ArticleCard({ article }: { article: Article }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        mb: 2,
      }}
    >
      <CardActionArea
        onClick={() =>
          navigate(`/article/${encodeURIComponent(article.id)}`, {
            state: article,
          })
        }
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "stretch",
        }}
      >
        {article.image && (
          <CardMedia
            component="img"
            sx={{
              width: { xs: "100%", sm: 200 },
              height: { xs: 180, sm: "auto" },
              objectFit: "cover",
            }}
            image={article.image}
            alt={article.title}
          />
        )}
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            {article.title}
          </Typography>
          {article.description && (
            <Typography variant="body2" color="text.secondary" paragraph>
              {article.description}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary">
            {article.source} •{" "}
            {dayjs(article.publishedAt).utc().format("MM/DD/YYYY")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
