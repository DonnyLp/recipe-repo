import express from 'express';
import Recipe from './Recipe.js';

const app = express();
const port = 3000;

// MongoDB connection goes here

app.use(express.json());

app.get('/search', async (req, res) => {
  try {
    const { recipe_name } = req.query;
    let query = {};

    if (recipe_name) {
      query.recipe_name = { $regex: recipe_name, $options: 'i' };
    }

    const recipes = await Recipe.find(query);
    res.json(recipes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});