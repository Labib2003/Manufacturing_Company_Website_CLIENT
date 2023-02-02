import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import HandymanIcon from "@mui/icons-material/Handyman";
import { useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import useToken from "../../hooks/useToken";

const pages = [
  { title: "Home", link: "/" },
  { title: "Products", link: "/all-products" },
  { title: "Dashboard", link: "/dashboard" },
];

function Navbar() {
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [user] = useAuthState(auth);
  const [token] = useToken(googleUser);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };

  return (
    <AppBar position="sticky" sx={{ marginBottom: 4 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HandymanIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            IronWorks
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem onClick={handleCloseNavMenu} key={page}>
                  <Typography textAlign="center">
                    <Link to={page.link}>{page.title}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <HandymanIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            IronWorks
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to={page.link}>{page.title}</Link>
              </Button>
            ))}
          </Box>

          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                onClick={handleLogout}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Typography variant="p">Log Out</Typography>
              </Button>
            </Box>
          ) : (
            <Box>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => signInWithGoogle()}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
