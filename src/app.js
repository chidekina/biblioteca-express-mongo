import express from "express";
import connectionToDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await connectionToDatabase();

connection.on("error", (error) => {
    console.error("Erro de conexao", error);
});

connection.once("open", () => {
    console.log("Conexao com o banco feita com sucesso");
});

const app = express();
routes(app);

app.get("/books/:id", (req, res) => {
    const index = searchBook(req.params.id);
    res.status(200).json(books[index]);
});

app.post("/books", (req, res) =>{
    books.push(req.body);
});

app.put("/books/:id", (req, res) => {
    const index = searchBook(req.params.id);
    books[index].title = req.body.title;
    res.status(200).json(books);
});

app.delete("/books/:id", (req, res) => {
    const index = searchBook(req.params.id);
    books.splice(index, 1);
    res.status(200).send("Livro removido.");
})

export default app;

