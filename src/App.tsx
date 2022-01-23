import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";

import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Category from "./pages/category";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:category" element={<Category />}></Route>
        </Routes>

        <Footer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
