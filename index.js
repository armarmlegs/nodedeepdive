const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: "SciFi" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Fantasy" },
];

function validateGenres(genre) {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
  });
  return schema.validate(genre);
}

app.get("/", (req, res) => {
  res.send("hello fool");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(400).send("no genre with that Id");
  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const { error } = validateGenres(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genres);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("no genre with the given id");

  const { error } = validateGenres(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});


app.delete('/api/genres/:id', (req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('no genre with given id');

    const index = genres.indexOf(genre);
    genres.splice(index,1)

    res.send(genre)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port:${port}`);
});
