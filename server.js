// server.js

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');  // Importamos el paquete cors

const BST = require('./public/scripts/tree.js');  // Importamos el árbol binario de búsqueda

const app = express();
const PORT = 5500;

// Creamos una instancia del árbol binario
const bst = new BST();

// Middleware para permitir CORS (solicitudes desde cualquier origen)
app.use(cors());  // Esto habilita CORS para todos los orígenes

// Middleware para parsear las solicitudes con formato JSON
app.use(bodyParser.json());
app.use(express.static('public'));  // Para servir archivos estáticos como HTML, CSS, JS

// Cargar los libros desde el archivo JSON y poblar el árbol
const loadBooksFromJSON = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'data', 'books.json'), 'utf-8');
        const books = JSON.parse(data);
        books.forEach(book => bst.insert(book));  // Insertar los libros en el árbol
    } catch (error) {
        console.error('Error al cargar los libros desde JSON:', error);
    }
};

// Sincronizar el árbol con el archivo JSON
const saveBooksToJSON = () => {
    const books = bst.inOrder();  // Obtener todos los libros ordenados
    fs.writeFileSync(path.join(__dirname, 'data', 'books.json'), JSON.stringify(books, null, 2));
};

// Ruta para obtener todos los libros
app.get('/api/books', (req, res) => {
    const books = bst.inOrder();  // Obtener los libros del árbol
    res.json(books);
});

// Ruta para obtener un libro por ISBN
app.get('/api/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = bst.search(isbn);  // Buscar el libro en el árbol
    if (book) {
        res.json(book);  // Enviar el libro encontrado
    } else {
        res.status(404).send('Libro no encontrado');
    }
});

// Ruta para agregar un nuevo libro
app.post('/api/books', (req, res) => {
    const newBook = req.body;
    bst.insert(newBook);  // Insertar el libro en el árbol
    saveBooksToJSON();  // Sincronizar el archivo JSON con el árbol
    res.status(201).json(newBook);  // Enviar el nuevo libro
});

// Ruta para eliminar un libro por ISBN
app.delete('/api/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    bst.delete(isbn);  // Eliminar el libro del árbol
    saveBooksToJSON();  // Sincronizar el archivo JSON con el árbol
    res.status(200).json({ message: 'Libro eliminado' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    loadBooksFromJSON();  // Cargar los libros al iniciar el servidor
});
