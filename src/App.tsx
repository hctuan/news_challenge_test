import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import Header from "./components/header";
import Home from "./pages/home";
import Category from "./pages/category";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:category" element={<Category />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
