
# BrModelo

## Modelo Lógico
<p align = "center">
<img src="https://github.com/user-attachments/assets/5c1ba9da-bf39-4b70-8657-d98e6cd81549">
</p>

```
CREATE DATABASE bancodobob;

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    CPF VARCHAR(24) NOT NULL UNIQUE,
    endereco VARCHAR(255) NOT NULL,
    telefone VARCHAR(24) NOT NULL
);

CREATE TABLE pet (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255),
    Raca VARCHAR(255) NOT NULL,
    Idade VARCHAR(5) NOT NULL,
    Porte VARCHAR(10) NOT NULL,
    Sexo VARCHAR(24) NOT NULL,
    Descricao TEXT,
    filename VARCHAR(255) NOT NULL,
    filePath VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES cliente(id) ON DELETE CASCADE
);

CREATE TABLE agendamento (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    horario VARCHAR(100),
    IdPet INT,
    servico VARCHAR(255),
    user_id INT,
    Descricao TEXT,
    FOREIGN KEY (IdPet) REFERENCES pet(Id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES cliente(id) ON DELETE CASCADE
    
);

```
