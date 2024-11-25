import { author } from "../models/Author.js";

class AuthorController {

    static async listAuthors (req, res) {
        try {
            const authorsList = await author.find({});
            res.status(200).json(authorsList);
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha na requisicao`
            });
        }
    };

    static async listAuthorsById(req, res) {
        try {
            const id = req.params.id;
            const foundAuthor = await author.findById(id);
            res.status(200).json(foundAuthor);
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha na requisicao`
            });
        }
    };

    static async registerAuthor(req, res) {
        try {
            const newAuthor = await author.create(req.body);
            res.status(201).json({
                message: "Criado com sucesso",
                book: newAuthor
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha ao cadastrar o livro`
            });
        }
    };

    static async updateAuthor(req, res) {
        try {
            const id = req.params.id;
            await author.findByIdAndUpdate(id, req.body);
            res.status(200).json({
                message: "Atualizado com sucesso"
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha na atualizacao`
            });
        }
    };

    static async deleteAuthor(req, res) {
        try {
            const id = req.params.id;
            await author.findByIdAndDelete(id);
            res.status(200).json({
                message: "Deletado com sucesso"
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha ao deletar`
            });
        }
    };

}
export default AuthorController;