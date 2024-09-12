/*

npx sequelize-cli model:generate --name User --attributes email:string,password:string,role:string

npx sequelize-cli model:generate --name Account --attributes name:string,address:string,phoneNumber:integer,role:string

npx sequelize-cli model:generate --name Category --attributes categoryName:string

npx sequelize-cli model:generate --name Product --attributes productName:string,description:string,imageURL:string,stock:integer,price:integer,CategoryId:integer

npx sequelize-cli model:generate --name accountProduct --attributes AccountId:integer,ProductId:integer

npx sequelize-cli migration:generate --name AddColumnUserId 


npx sequelize-cli seed:generate --name seederCategory
npx sequelize-cli seed:generate --name seederProduct
npx sequelize db:seed:all     
edit
edit1



*/