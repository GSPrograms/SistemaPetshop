# BrModelo 
## Modelo Conceitual
Utilizei do BrModelo para produzir o Modelo Conceitual e Modelo Lógico do Banco de dados que sera utilizado para este projeto.

<p align = "center">
  <img src="https://github.com/user-attachments/assets/03061bc6-cc27-43e3-86ae-8dac5dd4cbf8">
</p>
Mantive o Modelo Conceitual Simples e direto para fácil compreensão e modificações futuras.

Foram usado
s as Entidades:
``` 
Cliente(A base do Modelo e inicio, Possui relação com o Pet e serviço) 
Pet(Possui relação com Pet e PetShop)
PetShop(Possui relação com Cliente )

-------------Cliente e Pet-------------
Cliente -> Pet: deve possuir um pet e pode possuir Vários pets.
Pet -> Cliente: deve Possuir um Dono(cliente) e pode possuir vários donos.

-------------Serviços e Pet-------------
Serviços -> Pet:Pode não estar registrado a um Pet ou pode estar registrado a muitos Pets
Pet -> Serviços:Pode estar registrado a muitos serviços ou a nenhum.

-------------Serviço para Cliente-------
Serviço -> Cliente: Deve ter um Cliente e Pode e pode ter muitos.
Cliente -> Serviço: Não necessita de Serviço mas pode ter muitos.

```
