import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Moves from "./pages/Moves";
import SignUp from "./pages/Signup";
import Player from "./pages/player";
import Videos from "./pages/movies";
import TvShow from "./pages/TvShows";
import UserLike from "./pages/Userlike";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="player" element={<Player />} />
          <Route path="/movies" element={<Videos />} />
          <Route path="/TvShows" element={<TvShow />} />
          <Route path="//mylist" element={<UserLike />} />
          <Route path="/" element={<Moves />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
