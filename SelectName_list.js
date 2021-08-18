const router = require('express').Router();
const { copySync } = require('fs-extra');
const fetch = require('node-fetch');
const config = require('./dbconfig')
require('dotenv').config()



router.get('/', async (req, res) => {
    const Name = req.body.Name;
    const url_api = `http://localhost:3333/Namesearch/${Name}`;
    // console.log(Manuscript_Number)
    console.log(url_api)
    try{
        await fetch(url_api)
        .then(res => res.json())
        .then(data => {
            const Newdata=data[0]
            let arrName = []
            Newdata.map(item=>{arrName.push(item.Name)})
            console.log(decodeURI(arrName))
            let arrName_Id = []
            Newdata.map(item=>{arrName_Id.push(item.Name_Id)})
            let arrAffiliated_Institution = []
            Newdata.map(item=>{arrAffiliated_Institution.push(item.Affiliated_Institution)})
            let arrEmail = []
            Newdata.map(item=>{arrEmail.push(item.Email)})
            let arrCountry = []
            Newdata.map(item=>{arrCountry.push(item.Country)})
            return res.render('Name_list1',{
                Name:arrName, Name_Id:arrName_Id,Email:arrEmail,Affiliated_Institution:arrAffiliated_Institution,Country:arrCountry
             });
        });
    }catch (err) {
    }
})

router.post('/', async (req, res) => {
    const Name = req.body.Name;
    const url_api = `http://localhost:3333/Namesearch/${Name}`;
    const encodeURIapi =  encodeURI (url_api);
    // console.log(Manuscript_Number)
    // console.log(Name)
    try{
        await fetch(encodeURIapi)
        .then(res => res.json())
        .then(data => {
            const Newdata=data[0]
            let arrName = []
            Newdata.map(item=>{arrName.push(item.Name)})
            console.log(arrName)
            let arrName_Id = []
            Newdata.map(item=>{arrName_Id.push(item.Name_Id)})
            let arrAffiliated_Institution = []
            Newdata.map(item=>{arrAffiliated_Institution.push(item.Affiliated_Institution)})
            let arrEmail = []
            Newdata.map(item=>{arrEmail.push(item.Email)})
            let arrCountry = []
            Newdata.map(item=>{arrCountry.push(item.Country)})
              
            return res.render('Name_list1',{
                Name:arrName, Name_Id:arrName_Id,Email:arrEmail,Affiliated_Institution:arrAffiliated_Institution,Country:arrCountry
             });
        });
    }catch (err) {
        res.status(404).send('查無此筆資料 <button  onclick="history.back()" >回上一頁</button>');
    }
});


module.exports = router;