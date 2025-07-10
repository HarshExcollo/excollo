import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeroPage from "./Pages/HeroPage";
import AboutUsPage from "./Pages/AboutUsPage";
import ContactForm from "./Pages/ContactFormPage";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsOfService from "./Components/TermsOfService";
import { Box } from "@mui/material";
import "./App.css";
import ServicesPage from "./Pages/ServicesPage";
import CustomCursor from "./Components/CursorEffect/CursorEffetct";
import ScrollToTop from "./Components/ScrollToTop";
import Model from "./Components/Model";
import ChatBotWidget from "./Components/ChatBotWidget";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Box sx={{ backgroundColor: "#000", color: "#fff" }}>
        <CustomCursor />
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/model" element={<Model />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/privacy&policy" element={<PrivacyPolicy />} />
          <Route path="/termsofservice" element={<TermsOfService />} />
        </Routes>
      </Box>
      <ChatBotWidget />
    </Router>
  );
};

export default App;
