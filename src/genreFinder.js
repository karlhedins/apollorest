const genres = [
  { id: 1, genre: "rock" },
  { id: 2, genre: "pop" },
  { id: 3, genre: "classical" },
];

const genreFinder = genre => genres.find(g => g.genre === genre);

module.exports = genreFinder;
