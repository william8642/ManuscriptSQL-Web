const router = require('express').Router();
const { compile } = require('ejs');
const fetch = require('node-fetch');
const config = require('./dbconfig')
require('dotenv').config()


router.get('/', async (req, res) => {       
    const Manuscript_Number = req.body.Manuscript_Number;
    const url_api = `http://localhost:3333/KeyWordEdit/${Manuscript_Number}`;
    const chapi =  encodeURI (url_api);
    console.log(chapi)
    try{
        await fetch(chapi)
        .then(res => res.json())
        .then(data => {
            if (data.message === 'not found') {
                res.render('KeyWordEdit1', {
                    Manuscript_Number: null,
                    KeyWord: null
                })
            } else {    
            let Newdata=data[0]
            let arrManuscript_Number =[]
            Newdata.map(item=>{arrManuscript_Number.push(item.Manuscript_Number)})
            let arrKeyWord =[]
            Newdata.map(item=>{arrKeyWord.push(item.KeyWord)})

            res.render('KeyWordEdit1',{
                Manuscript_Number:arrManuscript_Number, KeyWord:arrKeyWord
            });
            }
        }); 
    }catch (err) {
        res.status(404).send('查無此筆資料 <button  onclick="history.back()" >回上一頁</button>');
    }
});
          

router.post('/', async (req, res) => {
    const Manuscript_Number = req.body.Manuscript_Number;
    const url_api = `http://localhost:3333/KeyWordEdit/${Manuscript_Number}`;
    const chapi =  encodeURI (url_api);
    console.log(chapi)
    try{
        await fetch(chapi)
        .then(res => res.json())
        .then(data => {
            if (data.message === 'not found') {
                res.render('KeyWordEdit1', {
                    Manuscript_Number: null,
                    KeyWord: null
                })
            } else {            
                let Newdata=data[0]
                let arrManuscript_Number =[]
                Newdata.map(item=>{arrManuscript_Number.push(item.Manuscript_Number)})
                let arrKeyWord =[]
                Newdata.map(item=>{arrKeyWord.push(item.KeyWord)})
                res.render('KeyWordEdit1',{
                    Manuscript_Number:arrManuscript_Number, KeyWord:arrKeyWord
                });
            }
        });
    }catch (err) {
        res.status(404).send('查無此筆資料 <button  onclick="history.back()" >回上一頁</button>');
    }
});

module.exports = router;