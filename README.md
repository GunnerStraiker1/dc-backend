# Backend DC

## Description
This API uses NodeJs, MongoDB, Swagger and JWT
If you want to see the documentation, you have to execute the server and
go to [http://localhost:3001/api/v1/docs/docs](http://localhost:3001/api/v1/docs/docs/)
---
## Execution
1. Run `npm install`
2. Run `npm run db:seed`
3. Run `npm start`
---
## Enviroment Variables
```
    DB_LOCATION= remote 
	//remote
	DB_HOST=dc-courses.qslbq.mongodb.net
	//host: localhost
	DB_PORT=27017

	DB_NAME=courses
	DB_USER=victor
	DB_PASS=admin

	PORT=3001

	JWT_KEY="yoursecretkey"
```