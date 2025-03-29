const mongoose = require("mongoose")

const bookSchema  = new mongoose.Schema({
    title: String,
    author: String,
    publishedYear: Number,
    genre: [String],
    language: String,
    country: String,
    rating: Number,
    summary: String,
    coverImageUrl: String
})

module.exports = mongoose.model("Book", bookSchema)