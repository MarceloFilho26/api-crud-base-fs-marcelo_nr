const express = require("express");
const sqlite = require("sqlite3").verbose();

const app = express();
const port = 3000;
const db = new sqlite.Database("database.db");

db.serialize(() => {
	db.run(
		"CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, cpf VARCHAR, telefone TEXT, email TEXT)",
	);

	// db.run("INSERT INTO users (username, password) VALUES ('admin', 'admin')")
});

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Estou na minha API");
});

app.get("/users", (req, res) => {
	db.all("SELECT * FROM users", (error, rows) => {
		if (error) {
			res.send(error);
		}
		res.send(rows);
	});
});

// pegar por ID

app.get("/users/:id", (req, res) => {
	const id = req.params.id;
	db.get("SELECT * FROM users WHERE id = ?", id, (error, rows) => {
		if (error) {
			res.send(error);
		}
		res.send(rows);
	});
});

app.post("/users", (req, res) => {
	const { username, password, cpf, telefone, email } = req.body;
	console.log(req.body);

	if (
		username == undefined ||
		username == "" ||
		password == undefined ||
		password == "" ||
		cpf == undefined ||
		cpf == "" ||
		telefone == undefined ||
		telefone == "" ||
		email == undefined ||
		email == ""
	) {
		res.send("Dados incompletos");
		return;
	} else {
		db.run(
			"INSERT INTO users (username, password, cpf, telefone, email) VALUES (?, ?, ?, ?, ?)",
			[username, password, cpf, telefone, email],
			(error) => {
				if (error) {
					res.send(error);
					return;
				}
				res.send(`Usuário ${username} cadastrado com sucesso`);
			},
		);
	}
});

app.put("/users/:id", (req, res) => {
	const id = req.params.id;
	const { username, password } = req.body;
	if (
		username == "undefined" ||
		username == "" ||
		password == "undefined" ||
		password == "" ||
		cpf == "undefined" ||
		cpf == "" ||
		telefone == "undefined" ||
		telefone == "" ||
		email == "undefined" ||
		email == ""
	) {
		res.send("Dados incompletos");
		return;
	} else {
		db.run(
			"UPDATE users SET username = ?, password = ?, cpf = ?, telefone = ?, email = ? WHERE id = ?",
			[username, password, cpf, telefone, email, id],
			(error) => {
				if (error) {
					res.send(error);
					return;
				}
				res.send(`Usuário ${username} atualizado com sucesso`);
			},
		);
	}
});

app.patch("/users/:id", (req, res) => {
	const id = req.params.id;
	const { username, password } = req.body;
	if (
		username == "undefined" ||
		username == "" ||
		password == "undefined" ||
		password == "" ||
		cpf == "undefined" ||
		cpf == "" ||
		telefone == "undefined" ||
		telefone == "" ||
		email == "undefined" ||
		email == ""
	) {
		res.send("Dados incompletos");
		return;
	} else {
		db.run(
			"UPDATE users SET username = ?, password = ?, cpf = ?, telefone = ?, email = ? WHERE id = ?",
			[username, password, cpf, telefone, email, id],
			(error) => {
				if (error) {
					res.send(error);
					return;
				}
				res.send(`Usuário ${username} atualizado com sucesso`);
			},
		);
	}
});

app.delete("/users/:id", (req, res) => {
	const id = req.params.id;
	db.run("DELETE FROM users WHERE id = ?", id, (error) => {
		if (error) {
			res.send(error);
			return;
		}
		res.send(`Usuário ${id} deletado com sucesso`);
	});
});

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});
