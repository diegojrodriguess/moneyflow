CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha TEXT NOT NULL
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    tipo VARCHAR(10) CHECK (tipo IN ('receita', 'despesa')),
    valor DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    descricao TEXT,
    data TIMESTAMP DEFAULT NOW()
);
