<p align = "center">
<img src="https://github.com/user-attachments/assets/a6c6921c-1114-40fc-860e-e93bd094886a">
</p>

```/* Lógico_3: */

CREATE TABLE cliente (
    CPF VARCHAR(11),
    Email VARCHAR(255),
    Endereco VARCHAR(255),
    Id INT PRIMARY KEY,
    Nome VARCHAR(255),
    Telefone VARCHAR(11)
);

CREATE TABLE pet (
    Id INT PRIMARY KEY,
    Nome VARCHAR(255),
    Raca VARCHAR(255),
    Idade NCHAR(3),
    Especie VARCHAR(100),
    Sexo CHAR(1),
    Tamanho FLOAT
);

CREATE TABLE PetShop (
    Id INT PRIMARY KEY,
    Nome VARCHAR(255),
    Localizacao VARCHAR(255)
);

CREATE TABLE Servico (
    Descricao TEXT,
    Preco FLOAT,
    Id INT PRIMARY KEY,
    MediaTempo VARCHAR(24)
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
    fk_PetShop_id INT,
    fk_cliente_id INT
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
    FOREIGN KEY (fk_PetShop_id???, fk_cliente_id???)
    REFERENCES ??? (???);
```
