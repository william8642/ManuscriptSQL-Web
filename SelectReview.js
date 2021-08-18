const router = require('express').Router();
const fetch = require('node-fetch');
const config = require('./dbconfig')
require('dotenv').config()


router.get('/', (req, res) => {
    res.render('ReviewEdit1', {
        Manuscript_Number: null,
        Name:null,
        Name_Id: null,
        Affiliated_Institution: null,
        Email: null,
        Country: null,
        Invited_Date: null,
        Responsed: null,
        Responsed_Date: null,
        Decision: null,
        Completed_Date: null
    });
});

router.post('/', async (req, res) => {
    const Manuscript_Number = req.body.Manuscript_Number;
    const Name = req.body.Name;
    const url_api = `http://localhost:3333/ReviewEdit/${Manuscript_Number}/${Name}`;
    const encodeURIapi =  encodeURI (url_api);
    // console.log(url_api)
    // console.log(Manuscript_Number)
    try{
        await fetch(encodeURIapi)
        .then(res => res.json())
        .then(data => {
            if (data.message === 'not found') {
                res.render('ReviewEdit1', {
                    Manuscript_Number: data.message,
                    Name: data.message,
                    Name_Id: null,
    
                    Affiliated_Institution: null,
                    Email: null,
                    Country: null,
                    Invited_Date: null,
                    Responsed: null,
                    Responsed_Date: null,
                    Decision: null,
                    Completed_Date: null
                })
            } else {
                const Manuscript_Number = data[0][0].Manuscript_Number;
                const Name = data[0][0].Name;
                const Name_Id = data[0][0].Name_Id;
                const Email = data[0][0].Email;
                const Affiliated_Institution = data[0][0].Affiliated_Institution;
                const Country = data[0][0].Country;
                const Invited_Date = data[0][0].Invited_Date;
                const Responsed = data[0][0].Responsed;
                const Responsed_Date = data[0][0].Responsed_Date;
                const Decision = data[0][0].Decision;
                const Completed_Date = data[0][0].Completed_Date;

            // console.log(data)
                res.render('ReviewEdit1',{
                    Manuscript_Number,Name,Email,Name_Id,Affiliated_Institution,Country,Invited_Date,Responsed,Responsed_Date,Decision,Completed_Date
                });
            }
        });
    }catch (err) {
        res.status(404).send('查無此筆資料 <button  onclick="history.back()" >回上一頁</button>');
    }
});

module.exports = router;