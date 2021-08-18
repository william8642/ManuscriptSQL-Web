const router = require('express').Router();
const fetch = require('node-fetch');
const config = require('./dbconfig')
require('dotenv').config()


router.get('/', (req, res) => {
    res.render('KeyWordCategoryEdit1', {
        Manuscript_Number: null,
        Category: null,
        Sub_Category:null
    });
  });

router.post('/', async (req, res) => {
  const Manuscript_Number = req.body.Manuscript_Number;
  // let pool = await sql.connect(config);
  const url_api = `http://localhost:3333/NBCategoryEdit/${Manuscript_Number}`;
  console.log(url_api)
  try{
    await fetch(url_api)
    .then(res => res.json())
    .then(data => {
      if (data.message === 'not found') {
        res.render('KeyWordCategoryEdit1',{
          Manuscript_Number: data.message,
          Category: null,
          Sub_Category:null
        })
      } else {
        const Manuscript_Number = data[0][0].Manuscript_Number;
        const Category = data[0][0].Category;
        const Sub_Category = data[0][0].Sub_Category
        res.render('KeyWordCategoryEdit1',{
           Manuscript_Number,Category,Sub_Category
        });
      }
    });
  }catch (err) {
    res.status(404).send('查無此筆資料 <button  onclick="history.back()" >回上一頁</button>');
  }
});

module.exports = router;