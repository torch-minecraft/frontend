import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import API from "./components/api";
import FAQ from "./components/faq";
import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./components/home";
import NotFound from "./components/notfound";
import SearchResult from "./components/search/searchResult";
import { theme } from "./theme";

import "./app.css";

function AppContent() {
  const location = useLocation();
  const isApi = location.pathname.includes("/api/v");

  if (!isApi) {
    return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/api" element={<API />} />
            <Route path="/search/:serverType/:ip" element={<SearchResult />} />
          </Route>
        </Routes>
        <Footer />
      </>
    );
  }

  return <></>;
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
