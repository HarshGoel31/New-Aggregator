import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

const SOURCES = ["NewsAPI", "The Guardian", "NYTimes"];
const CATEGORIES = [
  "General",
  "Politics",
  "Business",
  "Technology",
  "Sports",
  "Health",
];

export default function Filters({
  from,
  to,
  setFrom,
  setTo,
  category,
  setCategory,
  source,
  setSource,
}: any) {
  const minDate = dayjs().subtract(1, "month");
  const maxDate = dayjs();
  return (
    <Box sx={{ display: "flex", gap: 1, p: 1, flexWrap: "wrap" }}>
      <DatePicker
        label="From"
        value={from ? dayjs(from) : null}
        onChange={(newValue: Dayjs | null) =>
          setFrom(newValue ? newValue.format("YYYY-MM-DD") : undefined)
        }
        minDate={minDate}
        maxDate={maxDate}
        slotProps={{
          textField: {
            size: "small",
            sx: { flex: 1, minWidth: { xs: "100%", sm: "200px" } },
          },
        }}
      />

      <DatePicker
        label="To"
        value={to ? dayjs(to) : null}
        onChange={(newValue: Dayjs | null) =>
          setTo(newValue ? newValue.format("YYYY-MM-DD") : undefined)
        }
        minDate={minDate}
        maxDate={maxDate}
        slotProps={{
          textField: {
            size: "small",
            sx: { flex: 1, minWidth: { xs: "100%", sm: "200px" } },
          },
        }}
      />

      {/* Category single select */}
      <FormControl
        sx={{ flex: 1, minWidth: { xs: "100%", sm: 200 } }}
        size="small"
      >
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={category || ""}
          input={<OutlinedInput label="Category" />}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {CATEGORIES.map((c) => (
            <MenuItem key={c} value={c.toLowerCase()}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Source single select */}
      <FormControl
        sx={{ flex: 1, minWidth: { xs: "100%", sm: 200 } }}
        size="small"
      >
        <InputLabel id="source-label">Source</InputLabel>
        <Select
          labelId="source-label"
          value={source || ""}
          input={<OutlinedInput label="Source" />}
          onChange={(e) => setSource(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {SOURCES.map((s) => (
            <MenuItem key={s} value={s.split(" ").join("").toLowerCase()}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
