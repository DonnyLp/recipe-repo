import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const port = 9000;
const database_url = 'X';

const App = express();

App.use(express.json());
App.use(cors());
App.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
mongoose.connect(database_url)
  .then(r => r.connection.on(
    'error', (error) => console.log(error)))
  .then(r => r.once('connected', () => console.log('Databased Connected')))

export default App