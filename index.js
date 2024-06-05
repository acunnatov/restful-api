import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware to parse JSON bodies from incoming requests.
app.use(express.json());

// Serve static files (for serving the HTML page).
app.use(express.static(path.join(__dirname, 'public')));

// Sample data: a list of books.
let books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
];

// GET / - Serve the HTML instruction page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET /books - Retrieve all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET /books/:id - Retrieve a single book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
});

// POST /books - Create a new book
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');

    book.title = req.body.title;
    book.author = req.body.author;
    res.json(book);
});

// DELETE /books/:id - Delete a book by ID
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send('Book not found');

    const deletedBook = books.splice(bookIndex, 1);
    res.json(deletedBook);
});

// Start the server and listen on port 3000.
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
