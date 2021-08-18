const router = require('express').Router();
const fetch = require('node-fetch');
const config = require('./dbconfig')
require('dotenv').config()


// router.get('/', (req, res) => {
//   res.render('ManuscriptEdit1', {
//     Manuscript_Number: null,
//     Manuscript_Title: null,
//     Initial_DateSubmitted: null,
//     Status: null,
//     Status_Date: null,
//     Handing_editor: null,
//   });
// });

router.post('/', async (req, res) => {
  const Manuscript_Number = req.body.Manuscript_Number;
  const url_api = `http://localhost:3333/ManuscriptEdit/${Manuscript_Number}`;
  console.log(url_api)
  try{
    await fetch(url_api)
    .then(res => res.json())
    .then(data => {
      if(data.message === 'not found') {
        res.render('ManuscriptEdit1', {
          Manuscript_Number: data.message,
          Manuscript_Title: null,
          Initial_DateSubmitted: null,
          Status: null,
          Status_Date: null,
          Handing_editor: null,
        })
      }else{
        const Manuscript_Number = data[0][0].Manuscript_Number;
        const Manuscript_Title = data[0][0].Manuscript_Title;
        const Initial_DateSubmitted = data[0][0].Initial_DateSubmitted;
        const Status = data[0][0].Status;
        const Status_Date = data[0][0].Status_Date;
        const Handing_editor = data[0][0].Handing_editor;
        console.log(data)
        res.render('ManuscriptEdit1',{
          Manuscript_Number,Manuscript_Title,Initial_DateSubmitted,Status,Status_Date,Handing_editor
        });
      } 
    });
  }catch (err) {
    res.status(404).send('查無此筆資料 <button  onclick="history.back()" >回上一頁</button>');
  }
})

module.exports = router;