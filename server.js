const express = require('express');
const cors = require('cors'); // Importa o CORS
const bcrypt = require('bcrypt'); // Importa o bcrypt para criptografar senhas
const app = express();
const port = 3000; // Porta do servidor

// Middleware para tratar JSON
app.use(express.json());

// Middleware CORS para permitir requisições de outras origens
app.use(cors());

// Simulação de um banco de dados para armazenar as credenciais
let users = [];

// Rota para testar o servidor
app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});

// Rota de cadastro
app.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    
    // Validação de campos obrigatórios
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    // Validação de formato de e-mail
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'E-mail inválido!' });
    }

    // Validação das senhas
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'As senhas não coincidem!' });
    }

    // Verifica se o e-mail já foi registrado
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ error: 'E-mail já registrado!' });
    }

    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Salva o novo usuário no banco de dados simulado
    users.push({ username, email, password: hashedPassword });
    res.status(200).json({ message: 'Usuário cadastrado com sucesso!' });
});

// Rota de login (simulação)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Verifica se o usuário existe
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ error: 'E-mail ou senha incorretos!' });
    }

    // Verifica a senha usando bcrypt
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ error: 'E-mail ou senha incorretos!' });
    }

    res.status(200).json({ message: 'Login bem-sucedido!' });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
