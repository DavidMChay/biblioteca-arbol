// main.js

// Event listener para el botón de búsqueda
document.getElementById('searchButton').addEventListener('click', async function() {
    const isbn = document.getElementById('searchInput').value.trim();  // Obtener el ISBN ingresado

    if (!isbn) {
        return alert('Por favor, ingrese un ISBN.');
    }

    try {
        // Hacer la solicitud al servidor para buscar el libro por ISBN
        const response = await fetch(`http://localhost:5500/api/books/${isbn}`);

        if (response.ok) {
            const book = await response.json();  // Obtener el libro desde el servidor
            const resultsDiv = document.getElementById('results');
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
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = `<p>No se encontró el libro con ISBN: ${isbn}</p>`;
        }
    } catch (error) {
        console.error('Error al buscar el libro:', error);
        alert('Hubo un problema al realizar la búsqueda.');
    }
});

// Función para mostrar todos los libros
const loadAllBooks = async () => {
    try {
        const response = await fetch('http://localhost:5500/api/books');  // Obtener todos los libros del servidor

        if (response.ok) {
            const books = await response.json();
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '<h2>Catálogo de Libros:</h2>';

            books.forEach(book => {
                resultsDiv.innerHTML += `
                    <div class="book">
                        <h5>${book.title}</h5>
                        <p><strong>Autor:</strong> ${book.author}</p>
                        <p><strong>ISBN:</strong> ${book.ISBN}</p>
                        <p><strong>Descripción:</strong> ${book.description.slice(0, 100)}...</p>
                        <p><strong>Ubicación:</strong> ${book.location}</p>
                    </div>
                `;
            });
        } else {
            alert('Error al cargar los libros.');
        }
    } catch (error) {
        console.error('Error al cargar los libros:', error);
        alert('Hubo un problema al obtener los libros.');
    }
};

// Llamar a la función cuando la página de "Mostrar Todo" se cargue
if (window.location.pathname === '/catalogo.html') {
    loadAllBooks();
}
