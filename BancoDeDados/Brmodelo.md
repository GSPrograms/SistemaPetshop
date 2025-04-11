# BrModelo 
## Petshop
Utilizei do BrModelo para produzir o Modelo Conceitual e Modelo Lógico do Banco de dados que sera utilizado para este projeto.

<p align = "center">
  <img src="https://github.com/user-attachments/assets/3553fd7b-a821-4a85-9a6a-24208180f660">
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
