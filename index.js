const express = require("express")
const app = express()
app.use(express.json())
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const {initilizeDatabase} = require("./db/db.connect")
const Book = require("./models/books.models")

initilizeDatabase()

// post book

async function postBook(newBook){
    try{
        const book = new Book(newBook)
        const saveBook = await book.save()
        return saveBook

    }catch(error){
        throw error
    }
}


app.post("/books", async(req, res) => {
    try{
        const savedBook = await postBook(req.body)
        if(savedBook){
            res.status(200).json({message: "Book saved successfully.", book: savedBook})
        }else{
            res.status(404).json({error: "Book not found."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to get books."})
    }
})

async function readAllBooks(){
    try{
        const allBook = await Book.find()
        return allBook
        
    }catch(error){
        console.log("Error", error)
    }
}


app.get("/books", async(req, res) => {
    try{
        const allBook = await readAllBooks()
        if(allBook){
            res.status(200).json({message: "All books are found.", book: allBook})
        }else{
            res.status(404).json({error: "Book not found."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to get books."})
    }
})


// book delete 

async function deleteBook(bookId){
    try{
        const deletedBook = await Book.findByIdAndDelete(bookId)
        return deletedBook

    }catch(error){
        throw error
    }
}

app.delete("/books/:bookId", async(req, res) => {
    try{
        const deletedBook = await deleteBook(req.params.bookId)
        if(deletedBook){
            res.status(200).json({message: "Book deleted successfully.", book: deletedBook})
        }else{
            res.status(404).json({error: "Book not found."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to delete Book."})
    }
})

const PORT=3000
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})