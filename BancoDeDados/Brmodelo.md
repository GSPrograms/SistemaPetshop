# BrModelo 
## Petshop
Utilizei do BrModelo para produzir o Modelo Conceitual e Modelo Lógico do Banco de dados que sera utilizado para este projeto.

<p align = "center">
<a> <img src ="https://github.com/user-attachments/assets/17c29254-a528-4fa4-b647-c0f0c043579c"></a>
</p>
Mantive o Modelo lógico Simples e direto para fácil compreensão e modificações futuras.

Foram usados as Entidades:
``` 
Cliente(A base do Modelo e inicio, Possui relação com o Pet e PetShop) 
Pet(Possui relação com Pet e PetShop)
Serviço(Possui relação com Pet e PetShop)
PetShop(Possui relação com Cliente e Serviço)

-------------Cliente e Pet-------------
Cliente -> Pet: deve possuir um pet e pode possuir Vários pets.
Pet -> Cliente: deve Possuir um Dono(cliente) e pode possuir vários donos.


-------------Cliente e PetShop-------------
Cliente -> PetShop: Não é obrigatório registro para acessar ao petshop e só pode possuir 1 registro.
PetShop -> Cliente: pode possuir nenhum ou muitos registros de clientes.


-------------PetShop e Serviço-------------
PetShop -> Serviços: pode não possuir ou possuir muitos serviços.
Serviços -> Petshop: pode não possuir ou possuir muitos serviços.

-------------Serviços e Pet-------------
Serviços -> Pet:Pode não estar registrado a um Pet ou pode estar registrado a muitos Pets
Pet -> Serviços:Pode estar registrado a muitos serviços ou a nenhum.
```
