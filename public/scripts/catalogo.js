// catalogo.js

// Función para cargar los libros desde el servidor Express
const loadBooksFromServer = async () => {
    try {
        const response = await fetch('http://localhost:5500/api/books');  // Hacer la solicitud al servidor Express
        if (response.ok) {
            const books = await response.json();  // Parsear la respuesta JSON

            // Ordenar los libros por ISBN (de menor a mayor)
            books.sort((a, b) => a.ISBN - b.ISBN);

            // Mostrar los libros
            displayBooks(books);
        } else {
            console.error('Error al cargar los libros desde el servidor');
            alert('No se pudo cargar el catálogo.');
        }
    } catch (error) {
        console.error('Error al cargar los libros desde el servidor:', error);
        alert('Hubo un problema al cargar los libros.');
    }
};

// Función para mostrar los libros en el HTML
const displayBooks = (books) => {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';  // Limpiar la lista de libros antes de añadir los nuevos

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

// Cargar los libros al cargar la página
loadBooksFromServer();
