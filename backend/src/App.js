import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const port = 9000;
const database_url = 'mongodb+srv://icsi418:418repo@reciperepo.1iolb.mongodb.net/users';


const App = express();

App.use(express.json());
App.use(cors());
App.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});

mongoose.connect(database_url).catch(err => console.log(err));
const dbConnection = mongoose.connection;
dbConnection.on('error', (err) => {
  console.log('connection error', err);
})
dbConnection.once('open', () => {
  console.log('connected to database');
})



export default App