
1. Introduction :- 

	Create sample api code in node js using follwing

	- JSON Web Token (JWT)
	- TypeScript
	- Mongooes
	- Express
	- Jest test

2. Requirement:-
	- node js version 20 or above 20

3. Setup Code :-
	- Download repository or git pull code on your local machine.
	- Env file : add your mongooes atlas url and other setting
	- Run command "npm install"
	- Npm run dev
	- then open url in browser : http://localhost:8000/

4. Api use 
	- Create user api :
	    url : http://localhost:8000/users/create
	    Methoid: Post
	    Post data: {"username":"tester","email":"tester@gmail.com","password":"123456"}

	- Login api : 
		url : http://localhost:8000/auth/login
	    Methoid: Post
	    Post data: {"email":"tester@gmail.com","password":"123456"}

	- create customer api:
	    
		url : http://localhost:8000/customers
	    Methoid: Post
	    Post data: {"name":"Customer2","email":"customer2@gmail.com","phoneNumber":"8956325688"}
	    Header : Bearer Token : we will get token for login api

	 - You can find other api in code as well
	   - update customer 
	   - delete customer
	   - reset user pasword api
	   - create product
	   - update product
	   - delete product

5. If you want to run test :
	Note : I am using jest testing module for it.
	- you need to run command : npm run test


If You Found This Helpfull, then follow me.
Share With Other's as well.
