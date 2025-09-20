// src/pages/ArticlePage.tsx
import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  Stack,
  Paper,
  Container,
} from "@mui/material";
import type { Article } from "../types";

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const article = location.state as Article | undefined;

  if (!article) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6">Article not found</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{ pt: 2, pb: 4 }}>
      {/* Hero Image */}
      <Box sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={() => navigate("/")}>
          ← Back to Feed
        </Button>
      </Box>
      {article.image && (
        <Paper
          elevation={3}
          sx={{ overflow: "hidden", borderRadius: 2, mb: 3 }}
        >
          <Box
            component="img"
            src={article.image}
            alt={article.title}
            sx={{
              width: "100%",
              height: { xs: 240, md: 400 },
              objectFit: "cover",
            }}
          />
        </Paper>
      )}

      {/* Title */}
      <Typography variant="h3" fontWeight={600} gutterBottom>
        {article.title}
      </Typography>

      {/* Metadata */}
      <Stack
        direction="row"
        spacing={1}
        sx={{ flexWrap: "wrap", mb: 2 }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {article.author && <Chip label={`By ${article.author}`} />}
        <Chip label={article.source} color="primary" />
        <Chip
          label={new Date(article.publishedAt).toLocaleString()}
          variant="outlined"
        />
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Content */}
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.125rem",
          lineHeight: 1.8,
          color: "text.primary",
          mb: 3,
          "& p": { mb: 2 }, // if content is split into paragraphs
        }}
      >
        {article.content ||
          article.description ||
          "Full article content is not available."}
      </Typography>
    </Container>
  );
}
