const express = require('express');
const res = require('express/lib/response');
const app = express();
const cors = require('cors')
const PORT = 8000;
const {Pool} = require('pg');
const connectionString = 'postgres://postgres:postgrespw@localhost:55000/roguelike'

const pool = new Pool({
    connectionString: connectionString,
});
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));
pool.connect();
//Get all armor, or weapons, or spells
app.get('/api/:type', (req,res) =>{
    let type = req.params['type']
    console.log(type)
    pool.query(`SELECT * FROM ${type};`)
    .then(result =>{
        res.send(result.rows);
    })    
})
//Get armory item by id
app.get('/api/:type/:index', (req,res) => {
    let type = req.params['type']
    let index = req.params['index']
    pool.query(`SELECT * FROM ${type} where name='${index}';`)
    .then(result => {
        res.send(result.rows);
    })
});


app.post('/api/weapons', (req, res) =>{
    let newWep = req.body;
    console.log(newWep)
    pool.query(`INSERT INTO weapons (wepType, wepDmg, wepSpd, name) VALUES ('${newWep.type}', ${newWep.damage}, '${newWep.speed}','${newWep.name}');`)
    //res.send('Nice');
})

// app.delete()

app.listen(PORT, function() {
console.log(`Server is running ${PORT}`)
});