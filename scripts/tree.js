// tree.js
class TreeNode {
    constructor(book) {
        this.book = book;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(book) {
        const newNode = new TreeNode(book);
        if (!this.root) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }
    }

    _insertNode(node, newNode) {
        if (newNode.book.ISBN < node.book.ISBN) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
    }

    search(ISBN) {
        return this._searchNode(this.root, ISBN);
    }

    _searchNode(node, ISBN) {
        if (!node) {
            return null;
        }
        if (ISBN === node.book.ISBN) {
            return node.book;
        }
        return ISBN < node.book.ISBN
            ? this._searchNode(node.left, ISBN)
            : this._searchNode(node.right, ISBN);
    }

    inOrder() {
        const books = [];
        this._inOrderTraversal(this.root, books);
        return books;
    }

    _inOrderTraversal(node, books) {
        if (node) {
            this._inOrderTraversal(node.left, books);
            books.push(node.book);
            this._inOrderTraversal(node.right, books);
        }
    }

    delete(ISBN) {
        this.root = this._deleteNode(this.root, ISBN);
    }

    _deleteNode(node, ISBN) {
        if (!node) {
            return null;
        }

        if (ISBN < node.book.ISBN) {
            node.left = this._deleteNode(node.left, ISBN);
        } else if (ISBN > node.book.ISBN) {
            node.right = this._deleteNode(node.right, ISBN);
        } else {
            if (!node.left && !node.right) {
                return null;
            }
            if (!node.left) {
                return node.right;
            }
            if (!node.right) {
                return node.left;
            }
            let minNode = this._findMinNode(node.right);
            node.book = minNode.book;
            node.right = this._deleteNode(node.right, minNode.book.ISBN);
        }

        return node;
    }

    _findMinNode(node) {
        while (node && node.left) {
            node = node.left;
        }
        return node;
    }
}

// Exportar la clase BST para usarla en otro archivo
export default BST;
