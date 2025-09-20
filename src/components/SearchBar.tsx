import React, { useEffect, useState } from "react";
import { TextField, Box, Button } from "@mui/material";

type Props = {
  q: string;
  setQ: (val: string) => void;
  onSearch: () => void;
};

export default function SearchBar({ q, setQ, onSearch }: Props) {
  const [query, setQuery] = useState(q);

  useEffect(() => {
    const handler = setTimeout(() => {
      setQ(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query, setQ]);

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", p: 1 }}>
      <TextField
        size="small"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ flex: 1 }}
      />
    </Box>
  );
}
