const router = require('express').Router();
const fetch = require('node-fetch');
const config = require('./dbconfig')
require('dotenv').config()


router.get('/', (req, res) => {
    res.render('Author', {     
        Name: null,
        Email: null,
        Affiliated_Institution: null,
        Country: null,
    });
});

router.post('/', async (req, res) => {
    const Name = req.body.Name;
    const url_api = `http://localhost:3333/AuthorEdit/${Name}`;
    const chapi =  encodeURI (url_api);
    // console.log(url_api)
    // console.log(987)
    // console.log(req)
    try{
        await fetch(chapi)
        .then(res => res.json())
        .then(data => {
            if (data.message === 'not found') {
                res.render('Author', {
                    Name: data.message,
                    Email: null,
                    Affiliated_Institution: null,
                    Country: null,
                })
            } else {
                const Name = data[0][0].Name;
                const Email = data[0][0].Email;
                const Affiliated_Institution = data[0][0].Affiliated_Institution;
                const Country = data[0][0].Country;
                // console.log(data)
                res.render('Author',{
                    Name,Email,Affiliated_Institution,Country
                });
            }
        })
    }catch (err) {
        res.status(404).send('查無此筆資料 <button  onclick="history.back()" >回上一頁</button>');
    }
});

module.exports = router;