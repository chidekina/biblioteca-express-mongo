import book from "../models/Book.js";
import {
    author
} from "../models/Author.js";

class BookController {

    static async listBooks(req, res) {
        try {
            const booksList = await book.find({});
            res.status(200).json(booksList);
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha na requisicao`
            });
        }
    };

    static async listBookById(req, res) {
        try {
            const id = req.params.id;
            const foundBook = await book.findById(id);
            res.status(200).json(foundBook);
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha na requisicao`
            });
        }
    };

    static async registerBook(req, res) {
        const newBook = req.body;
        try {
            const findedAuthor = await author.findById(newBook.author);
            const completedBook = {
                ...newBook,
                author: {
                    ...findedAuthor._doc
                }
            };
            const createdBook = await book.create(completedBook);
            res.status(201).json({
                message: "Criado com sucesso",
                book: createdBook
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha ao cadastrar o livro`
            });
        }
    };

    static async updateBook(req, res) {
        try {
            const id = req.params.id;
            await book.findByIdAndUpdate(id, req.body);
            res.status(200).json({
                message: "Atualizado com sucesso"
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha na atualizacao`
            });
        }
    };

    static async deleteBook(req, res) {
        try {
            const id = req.params.id;
            await book.findByIdAndDelete(id);
            res.status(200).json({
                message: "Deletado com sucesso"
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha ao deletar`
            });
        }
    };

    static async listBooksByPublisher(req, res) {
        const publisher = req.query.publisher;
        try {
            const booksByPublisher = await book.find({
                publisher: publisher
            });
            res.status(200).json(booksByPublisher);
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha na busca`
            });
        }
    }
};

export default BookController;