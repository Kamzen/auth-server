import { Fragment, useState } from "react";

import AppBar from "@mui/material/AppBar";
import { Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import { AccountCircle } from "@mui/icons-material";
import AdbIcon from "@mui/icons-material/Adb";
import { Box } from "@mui/system";

const TopNavigation = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const pages = ["Menu Item 1", "Menu Item 2", "Menu Item 3"];

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseElNav = () => {
    setAnchorElNav(null);
  };

  return (
    <Fragment>
      <AppBar   position="fixed">
        <Toolbar>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

          <Typography
            component={"div"}
            variant="h6"
            noWrap
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3em",
              mr : 2
            }}
          >
            AUTH
          </Typography>

          <Box  sx={{ 
                flexGrow: 1, display: { xs: "none", md: "flex" } 
                }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseElNav}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={handleOpenNavMenu}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="app-menu-bar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseElNav}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {pages.map((page) => (
              <MenuItem key={page}>
                <Typography>{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default TopNavigation;
