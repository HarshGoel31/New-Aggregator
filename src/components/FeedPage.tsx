import { Box, CircularProgress, Stack, Typography, Paper } from "@mui/material";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import ArticlesList from "../components/ArticlesList";
import { useArticles } from "../hooks/useArticles";

export default function FeedPage() {
  const [q, setQ] = useState("");
  const [from, setFrom] = useState<string | undefined>();
  const [to, setTo] = useState<string | undefined>();
  const [source, setSource] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const { articles, filteredArticles, loading, error } = useArticles({
    q,
    from,
    to,
    sources: source,
    categories: category,
  });

  const hasFilters = Boolean(source);

  return (
    <Stack spacing={3}>
      {/* Search + Filters in a card */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          background: "#fff",
        }}
      >
        <SearchBar q={q} setQ={setQ} onSearch={() => {}} />
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="center"
        >
          <Filters
            from={from}
            to={to}
            setFrom={setFrom}
            setTo={setTo}
            category={category}
            setCategory={setCategory}
            source={source}
            setSource={setSource}
          />
        </Stack>
      </Paper>

      {/* Articles Section */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress size={40} />
        </Box>
      ) : error ? (
        <Typography
          color="error"
          align="center"
          sx={{ fontWeight: 500, mt: 4 }}
        >
          {error}
        </Typography>
      ) : (
        <ArticlesList
          articles={
            hasFilters && filteredArticles.length ? filteredArticles : articles
          }
        />
      )}
    </Stack>
  );
}
