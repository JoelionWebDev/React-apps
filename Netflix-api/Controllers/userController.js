const User = require("../Models/userModel");
module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else
        return res.json({ msg: "movies already added to the liked list." });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "movie added successfully" });
  } catch (err) {
    return res.json({ msg: "Error adding movies" });
  }
};

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      res.json({ msg: "sucess", movies: user.likedMovies });
    } else {
      return res.json({ msg: "User with given email not found." });
    }
  } catch (error) {
    return res.json({ msg: "Error feteching movie" });
  }
};
module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieID } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieIndex = likedMovies.findIndex(({ id }) => id === movieID);
      if (!movieIndex) res.status(400).send({ msg: "Movie not found" });
      likedMovies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie Deleted", movies: likedMovies });
    }
  } catch (error) {
    return res.json({ msg: "Error deleting movies" });
  }
};
