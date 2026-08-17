import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Ringtones from "./pages/Ringtones";
import Categories from "./pages/Categories";
import Search from "./pages/Search";
import SoundDetails from "./pages/SoundDetails";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ringtones" element={<Ringtones />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/search" element={<Search />} />
          <Route path="/sound/:id" element={<SoundDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;