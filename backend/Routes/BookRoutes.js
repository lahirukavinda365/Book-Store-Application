import express from 'express';
const router = express.Router();
import { Book } from '../Models/BookModel.js';



router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishedYear) {
            return res.status(400).send({
                message: 'send all required fields: title, author, published Year'
            });
        };

        const newBook = {
            title: req.body.title,
            author:req.body.author,
            publishedYear:req.body.publishedYear
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});


//route for get book

router.get('/', async(req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count:books.length,
            data:books
        });
    } catch (error) {
        console.log(error.message);
        return  res.status(500).send({message:error.message});
    }
});

// route for get book by id

router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params;

        const book = await Book.findById(id);
        return res.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        return  res.status(500).send({message:error.message});
    }
});

// route for update book by id

router.put('/:id', async(req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishedYear) {
            return res.status(400).send({
                message: 'send all required fields: title, author, published Year'
            });
        };

        const {id} = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({message:"Book not found"});
        }

        return res.status(200).send({message:"Book Updated Successfully"})



    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

//delete book route

router.delete('/:id', async(req, res) => {
    try {
        const {id} = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message:"Book not found"});
        }

        return res.status(200).send({message:"Book Deleted Successfully"})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});


export default router;
