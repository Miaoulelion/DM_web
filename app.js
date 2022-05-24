const express= require('express');
const app=express();
const cors=require('cors');

const dbService=require('./DbService');
const { response } = require('express');
app.use(cors());
app.use(express.json());

app.get('/getAll', (req, res)=>{
    const db=dbService.getDbServiceInstance();
    const result=db.getAllData();
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));
})
   
app.post('/insert', (req, res)=>{
    const { name } = req.body;
    const db = dbService.getDbServiceInstance();
    const result=db.insertNewName(name);
    result
    .then(data => res.json({data:data}))
    .catch(err=>console.log(err));
});

app.listen(process.env.PORT, ()=> console.log('app is running ' + Date().toString()));