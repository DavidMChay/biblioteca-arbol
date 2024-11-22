// catalogo.js

// Función para cargar los libros desde el archivo JSON
const loadBooksFromJSON = async () => {
    try {
        const response = await fetch('./data/books.json');  // Cargar el archivo JSON
        const books = await response.json();  // Parsear el JSON

        // Ordenar los libros por ISBN (de menor a mayor)
        books.sort((a, b) => a.ISBN - b.ISBN);

        // Mostrar los libros
        displayBooks(books);
    } catch (error) {
        console.error('Error al cargar los libros desde JSON:', error);
    }
};

// Función para mostrar los libros en el HTML
const displayBooks = (books) => {
    const bookList = document.getElementById('bookList');

    books.forEach(book => {
        // Crear un div para cada libro
        const bookItem = document.createElement('div');
        bookItem.classList.add('list-group-item', 'list-group-item-action');
        
        // Contenido del libro
        bookItem.innerHTML = `
            <h5 class="mb-1">${book.title}</h5>
            <p class="mb-1"><strong>Autor:</strong> ${book.author}</p>
            <p class="mb-1"><strong>ISBN:</strong> ${book.ISBN}</p>
            <p class="mb-1"><strong>Descripción:</strong> ${book.description.slice(0, 100)}...</p>
        `;

        // Añadir el libro al contenedor de libros
        bookList.appendChild(bookItem);
    });
};

// Cargar los libros cuando se cargue la página
loadBooksFromJSON();
