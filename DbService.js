const mysql = require('mysql');
const dotenv = require('dotenv');
let instance=null;

dotenv.config();

const connection=mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port : process.env.DBPORT
})

connection.connect(function(err){
    if(err){
        console.log(err.message)
    } 
});


class DbService{
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }

    async getAllData(){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query="SELECT * FROM user;";

                connection.query(query, (err, results)=>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response);
            return response;

        } catch(error){
            console.log(error);
        }
    }

    async insertNewName(name){
        console.log("insertnewname : " +name)
        try{
            const insertID = await new Promise((resolve, reject)=>{
                const query = "INSERT INTO user (login, password) VALUES (?,'vide');";
                connection.query(query,[name], (err, result)=>{
                    console.log("il y a une erreur ? insernetame: "+err)
                    if(err) reject(new Error(err.message));
                    resolve(result.insertID);
                    
                })
            });
            return{
                id:insertID,
                name:name
            };
        }catch(error){
            console.log(error)
        }
    }
}

//test
module.exports=DbService;