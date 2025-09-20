import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ArticlePage from "./components/ArticlePage";
import ArticlesList from "./components/ArticlesList";
import Filters from "./components/Filters";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { useArticles } from "./hooks/useArticles";
import FeedPage from "./components/FeedPage";

export default function App() {
  const [q, setQ] = useState("");
  const [from, setFrom] = useState<string | undefined>();
  const [to, setTo] = useState<string | undefined>();
  const [source, setSource] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [openSettings, setOpenSettings] = useState(false);

  const { articles, filteredArticles, loading, error } = useArticles({
    q,
    from,
    to,
    sources: source ?? "",
    categories: category ?? "",
  });

  return (
    <Box
      sx={{
        bgcolor: "#f9fafb",
        minHeight: "100vh",
        minWidth: "calc(100vw - 14px)",
      }}
    >
      {/* Sticky App Header */}
      <Header onOpenSettings={() => setOpenSettings(true)} />

      <Container
        maxWidth={false}
        sx={{
          pt: { xs: 10, md: 10 },
          pb: 4,
        }}
      >
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          py: 3,
          mt: 4,
          borderTop: "1px solid #e5e7eb",
          color: "text.secondary",
          fontSize: 14,
        }}
      >
        © {new Date().getFullYear()} News Aggregator. Built with ❤️ using React
        + MUI.
      </Box>
    </Box>
  );
}
