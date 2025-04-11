
# BrModelo

## Modelo Lógico
<p align = "center">
<img src="https://github.com/user-attachments/assets/d8b2ea65-572b-4223-93d2-2e85e1f0e02e">
</p>

```
/* Lógico_1: */
CREATE TABLE cliente (
    CPF VARCHAR(24) NOT NULL,
    Email VHARCHAR(255),
    Endereco VARCHAR(255) NOT NULL,
    Id INT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Telefone VARCHAR(24) NOT NULL
);

CREATE TABLE pet (
    Id INT PRIMARY KEY,
    Nome VARCHAR(255),
    Raca VARCHAR(255) NOT NULL,
    Idade INT NOT NULL,
    Tamanho VARCHAR(24) NOT NULL,
    Sexo VARCHAR(24) NOT NULL
);

CREATE TABLE PetShop (
    Nome VARCHAR(255) NOT NULL,
    Localizacao VARCHAR(255) NOT NULL,
    Email VARCHAR(255),
    Telefone VARCHAR(24) NOT NULL,
    CPNJ VARCHAR((24) NOT NULL,
    Id INT PRIMARY KEY
);

CREATE TABLE Servico (
    Descricao TEXT,
    Preco FLOAT,
    Id INT PRIMARY KEY,
    MediaTempo VARCHAR(255)
);

CREATE TABLE dono_de (
    fk_pet_Id INT,
    fk_cliente_Id INT
);

CREATE TABLE agenda (
    fk_pet_Id INT,
    fk_Servico_Id INT
);

CREATE TABLE oferece (
    fk_PetShop_Id INT,
    fk_Servico_Id INT
);

CREATE TABLE Frequenta (
    fk_cliente_Id INT,
    fk_PetShop_Id INT
);
 
ALTER TABLE dono_de ADD CONSTRAINT FK_dono_de_1
    FOREIGN KEY (fk_pet_Id)
    REFERENCES pet (Id)
    ON DELETE RESTRICT;
 
ALTER TABLE dono_de ADD CONSTRAINT FK_dono_de_2
    FOREIGN KEY (fk_cliente_Id)
    REFERENCES cliente (Id)
    ON DELETE RESTRICT;
 
ALTER TABLE agenda ADD CONSTRAINT FK_agenda_1
    FOREIGN KEY (fk_pet_Id)
    REFERENCES pet (Id)
    ON DELETE SET NULL;
 
ALTER TABLE agenda ADD CONSTRAINT FK_agenda_2
    FOREIGN KEY (fk_Servico_Id)
    REFERENCES Servico (Id)
    ON DELETE SET NULL;
 
ALTER TABLE oferece ADD CONSTRAINT FK_oferece_1
    FOREIGN KEY (fk_PetShop_Id)
    REFERENCES PetShop (Id)
    ON DELETE SET NULL;
 
ALTER TABLE oferece ADD CONSTRAINT FK_oferece_2
    FOREIGN KEY (fk_Servico_Id)
    REFERENCES Servico (Id)
    ON DELETE SET NULL;
 
ALTER TABLE Frequenta ADD CONSTRAINT FK_Frequenta_1
    FOREIGN KEY (fk_cliente_Id)
    REFERENCES cliente (Id)
    ON DELETE SET NULL;
 
ALTER TABLE Frequenta ADD CONSTRAINT FK_Frequenta_2
    FOREIGN KEY (fk_PetShop_Id)
    REFERENCES PetShop (Id)
    ON DELETE SET NULL;
```
