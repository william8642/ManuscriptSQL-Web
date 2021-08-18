const router = require('express').Router();
const fetch = require('node-fetch');
const config = require('./dbconfig')
require('dotenv').config()


// router.get('/', (req, res) => {
//     res.render('AuthorEdit1', {
//         Manuscript_Number: null,
//         Order:null,
//         Name: null,
//         Name_Id: null,
//         Email: null,
//         Affiliated_Institution: null,
//         Country: null,
//         Corresponding: null,
//         NoName:null
//     });
//   });

router.post('/', async (req, res) => {
    const Manuscript_Number = req.body.Manuscript_Number;
    const Name = req.body.Name;
    const url_api = `http://localhost:3333/AuthorEdit/${Manuscript_Number}/${Name}`;
    const encodeURIapi =  encodeURI (url_api);
    console.log(encodeURIapi)
    try{
        await fetch(encodeURIapi)
        .then(res => res.json())
        .then(data => {
            if (data.message === 'not found') {
                res.render('AuthorEdit1', {
                Manuscript_Number: data.message,
                Name: data.message,
                Order:null,
                Email: null,
                Name_Id: null,
                Affiliated_Institution: null,
                Country: null,
                Corresponding: null,
                NoName:null
                })
            } else {
                const Manuscript_Number = data[0][0].Manuscript_Number;
                const Name = data[0][0].Name;
                const Name_Id = data[0][0].Name_Id;
                const Order = data[0][0].Order;
                const Email = data[0][0].Email;
                const Affiliated_Institution = data[0][0].Affiliated_Institution;
                const Country = data[0][0].Country;
                const Corresponding = data[0][0].Corresponding;
                res.render('AuthorEdit1',{
                    Manuscript_Number,Name,Name_Id,Order,Email,Affiliated_Institution,Country,Corresponding,NoName:null
                });
            }
        });
    }catch {
    res.status(404).send('查無此筆資料 <button  onclick="history.back()" >回上一頁</button>');
    }
})

module.exports = router;