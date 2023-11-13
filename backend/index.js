import express from "express"
import cors from "cors"
import { PORT, MONGODB_URL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./Models/BookModel.js";
import BooksRoutes from './Routes/BookRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders:['Content-Type'],
// }))


app.get('/', (req, res) => {
    console.log(req);

    return res.status(234).send('Welcome to MERN stack');
})

app.use('/books', BooksRoutes);



mongoose.connect(MONGODB_URL)
.then((result) => {
    console.log('App connected to the DB');
    
}).catch((err) => {
    console.log(err);
});

app.listen (PORT , () => {
    console.log(`App is listening to the port : ${PORT}`);
});





























