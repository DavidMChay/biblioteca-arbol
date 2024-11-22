// edit.js

let currentBook = null;  // Variable para almacenar el libro que estamos editando

// Función para buscar un libro por ISBN en el backend
const searchBookByISBN = async (isbn) => {
    try {
        const response = await fetch(`http://localhost:5500/api/books/${isbn}`);  // Hacer la solicitud al servidor

        if (response.ok) {
            return await response.json();  // Obtener el libro desde el servidor
        } else {
            alert(`No se encontró el libro con ISBN: ${isbn}`);
            return null;
        }
    } catch (error) {
        console.error('Error al buscar el libro:', error);
        alert('Hubo un problema al realizar la búsqueda.');
    }
};

// Función para llenar el formulario con los datos del libro encontrado
const fillFormWithBookData = (book) => {
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('description').value = book.description;
    document.getElementById('amount').value = book.amount;
    document.getElementById('location').value = book.location;

    // Mostrar el botón de eliminar
    document.getElementById('deleteButton').style.display = 'inline-block';
    currentBook = book;  // Almacenar el libro que estamos editando
};

// Función para limpiar el formulario
const clearForm = () => {
    document.getElementById('isbnInput').value = '';
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('location').value = '';

    // Ocultar el botón de eliminar
    document.getElementById('deleteButton').style.display = 'none';
    currentBook = null;
};

// Validar los campos del formulario
const validateForm = () => {
    const isbn = document.getElementById('isbnInput').value.trim();
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const description = document.getElementById('description').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const location = document.getElementById('location').value.trim();

    if (!isbn || !title || !author || !description || !amount || !location) {
        alert("Todos los campos deben estar completos.");
        return false;
    }

    return true;
};

// Guardar o actualizar el libro en el servidor
const saveBook = async () => {
    if (!validateForm()) {
        return;  // Si el formulario no es válido, no hacemos nada
    }

    const isbn = document.getElementById('isbnInput').value;
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const location = document.getElementById('location').value;

    const newBook = { ISBN: isbn, title, author, description, amount, location };

    try {
        let response;
        if (currentBook) {
            // Si estamos editando un libro existente, lo actualizamos
            response = await fetch(`http://localhost:5500/api/books/${currentBook.ISBN}`, {
                method: 'DELETE'  // Eliminar el libro anterior
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el libro anterior');
            }
        }

        // Insertar el libro actualizado o nuevo
        response = await fetch('http://localhost:5500/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });

        if (response.ok) {
            alert('Libro guardado exitosamente!');
            clearForm();  // Limpiar el formulario
        } else {
            throw new Error('Error al guardar el libro');
        }
    } catch (error) {
        console.error('Error al guardar o actualizar el libro:', error);
        alert('Hubo un problema al guardar el libro.');
    }
};

// Eliminar el libro en el servidor
const deleteBook = async () => {
    if (currentBook) {
        try {
            const response = await fetch(`http://localhost:5500/api/books/${currentBook.ISBN}`, {
                method: 'DELETE'  // Eliminar el libro por ISBN
            });

            if (response.ok) {
                alert('Libro eliminado exitosamente!');
                clearForm();  // Limpiar el formulario
            } else {
                alert('Error al eliminar el libro');
            }
        } catch (error) {
            console.error('Error al eliminar el libro:', error);
            alert('Hubo un problema al eliminar el libro.');
        }
    }
};

// Manejar el evento de búsqueda
document.getElementById('searchButton').addEventListener('click', async () => {
    const isbn = document.getElementById('isbnInput').value;
    const book = await searchBookByISBN(isbn);  // Realizar la búsqueda en el servidor

    if (book) {
        fillFormWithBookData(book);  // Llenar el formulario con los datos del libro encontrado
    } else {
        clearForm();  // Limpiar el formulario si no se encuentra el libro
    }
});

// Manejar el evento de guardar
document.getElementById('saveButton').addEventListener('click', (event) => {
    event.preventDefault();  // Prevenir el comportamiento por defecto del formulario
    saveBook();  // Guardar o actualizar el libro
});

// Manejar el evento de eliminar
document.getElementById('deleteButton').addEventListener('click', () => {
    deleteBook();  // Eliminar el libro
});

// Cargar los libros al árbol cuando se carga la página
// (ya no es necesario, ya que el árbol está en el servidor)
