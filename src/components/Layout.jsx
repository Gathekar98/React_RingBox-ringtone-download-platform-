import {
  Outlet,
} from "react-router-dom";

import Navbar
  from "./Navbar";

import Footer
  from "./Footer";

import BottomPlayer
  from "./BottomPlayer";

function Layout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

      <BottomPlayer />
    </>
  );
}

export default Layout;