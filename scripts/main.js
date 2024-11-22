// main.js

import BST from './tree.js';  // Importamos el árbol binario

const bst = new BST();  // Creamos una instancia del árbol binario

// Función para cargar los libros desde el archivo JSON
const loadBooksFromJSON = async () => {
    try {
        const response = await fetch('./data/books.json');  // Cargar el archivo JSON
        const books = await response.json();  // Parsear el JSON

        // Insertar cada libro en el árbol
        books.forEach(book => {
            bst.insert(book);  // Usamos la función insert para agregar el libro al árbol
        });
    } catch (error) {
        console.error('Error al cargar los libros desde JSON:', error);
    }
}

// Cargar los libros al árbol cuando la página se carga
loadBooksFromJSON();

// Event listener para el botón de búsqueda
document.getElementById('searchButton').addEventListener('click', function() {
    const isbn = document.getElementById('searchInput').value.trim();  // Obtener el ISBN ingresado
    const book = bst.search(isbn);  // Realizar la búsqueda en el árbol binario

    const resultsDiv = document.getElementById('results');
    
    if (book) {
        // Si el libro es encontrado, mostramos sus detalles
        resultsDiv.innerHTML = `
            <p>Libro encontrado:</p>
            <p><strong>Título:</strong> ${book.title}</p>
            <p><strong>Autor:</strong> ${book.author}</p>
            <p><strong>ISBN:</strong> ${book.ISBN}</p>
            <p><strong>Descripción:</strong> ${book.description}</p>
            <p><strong>Cantidad:</strong> ${book.amount}</p>
            <p><strong>Ubicación:</strong> ${book.location}</p>
        `;
    } else {
        // Si no se encuentra el libro, mostramos un mensaje de no encontrado
        resultsDiv.innerHTML = `<p>No se encontró el libro con ISBN: ${isbn}</p>`;
    }
});
