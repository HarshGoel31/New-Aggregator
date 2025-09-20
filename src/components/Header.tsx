import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NewspaperIcon from "@mui/icons-material/Newspaper";

export default function Header({
  onOpenSettings,
}: {
  onOpenSettings: () => void;
}) {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
      }}
    >
      <Toolbar>
        {/* Logo/Icon */}
        <NewspaperIcon sx={{ mr: 1 }} />

        {/* Title + subtitle */}
        {/* <Box sx={{ flexGrow: 1 }}> */}
        <Typography
          variant="h6"
          noWrap
          sx={{ fontWeight: 600, letterSpacing: 0.5 }}
        >
          News Aggregator
        </Typography>
        {/* </Box> */}
      </Toolbar>
    </AppBar>
  );
}
