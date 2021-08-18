const router = require('express').Router();
const { copySync } = require('fs-extra');
const fetch = require('node-fetch');
const config = require('./dbconfig')
require('dotenv').config()


router.post('/', async (req, res) => {
    const Manuscript_Number = req.body.Manuscript_Number;
    const url_api = `http://localhost:3333/ALL/${Manuscript_Number}`;
    console.log(url_api)
    try{
        await fetch(url_api)
        .then(res => res.json())
        .then(data => {
            if (data.message === 'not found') {
                res.render('SummaryTable', {
                    Manuscript_Number:data.message,Manuscript_Title:null,Initial_DateSubmitted:null,Status,Status_Date:null,Handing_editor:null,Order:null,Name:null,Name_Id:null,Email:null,Affiliated_Institution:null,Country:null,Corresponding:null,Name2:null,Name_Id2:null,Email2:null,Affiliated_Institution2:null,Country2:null,Invited_Date2:null,Responsed2:null,Responsed_Date2:null,Decision2:null,Compconsted_Date2:null
                })
            } else {
                const Manuscript_Number = data[0].Manuscript_Number;
                const Manuscript_Title = data[0].Manuscript_Title;
                const Initial_DateSubmitted = data[0].Initial_DateSubmitted;
                const Status = data[0].Status;
                const Status_Date = data[0].Status_Date;
                const Handing_editor = data[0].Handing_editor;

                const AuthorData=data[1]
                const arrName =[]
                AuthorData.map(item=>{arrName.push(item.Name)})
                const arrOrder =[]
                AuthorData.map(item=>{arrOrder.push(item.Order)})
                const arrName_Id =[]
                AuthorData.map(item=>{arrName_Id.push(item.Name_Id)})
                const arrEmail =[]
                AuthorData.map(item=>{arrEmail.push(item.Email)})
                const arrAffiliated_Institution =[]
                AuthorData.map(item=>{arrAffiliated_Institution.push(item.Affiliated_Institution)})
                const arrCountry =[]
                AuthorData.map(item=>{arrCountry.push(item.Country)})
                const arrCorresponding =[]
                AuthorData.map(item=>{arrCorresponding.push(item.Corresponding)})


                const ReviewData=data[2]
                const ReviewName =[]
                ReviewData.map(item=>{ReviewName.push(item.Name)})
                const ReviewName_Id =[]
                ReviewData.map(item=>{ReviewName_Id.push(item.Name_Id)})
                const ReviewEmail =[]
                ReviewData.map(item=>{ReviewEmail.push(item.Email)})
                const ReviewAffiliated_Institution =[]
                ReviewData.map(item=>{ReviewAffiliated_Institution.push(item.Affiliated_Institution)})
                const ReviewCountry =[]
                ReviewData.map(item=>{ReviewCountry.push(item.Country)})
                const ReviewInvited_Date =[]
                ReviewData.map(item=>{ReviewInvited_Date.push(item.Invited_Date)})
                const ReviewResponsed =[]
                ReviewData.map(item=>{ReviewResponsed.push(item.Responsed)})
                const ReviewResponsed_Date =[]
                ReviewData.map(item=>{ReviewResponsed_Date.push(item.Responsed_Date)})
                const ReviewDecision =[]
                ReviewData.map(item=>{ReviewDecision.push(item.Decision)})
                const ReviewCompleted_Date =[]
                ReviewData.map(item=>{ReviewCompleted_Date.push(item.Completed_Date)})

                const KeyWordData=data[3]
                const KeyWord =[]
                KeyWordData.map(item=>{KeyWord.push(item.KeyWord)})

                const CategoryData = data[4];
                const Category =[]
                CategoryData.map(item=>{Category.push(item.Category)})
                const Sub_Category =[]
                CategoryData.map(item=>{Sub_Category.push(item.Sub_Category)})




                // console.log(123)
                // console.log(data)
                console.log(ReviewDecision)
                return res.render('SummaryTable',{
                    Manuscript_Number,Manuscript_Title,Initial_DateSubmitted,Status,Status_Date,Handing_editor,
                    Order:arrOrder,Name:arrName,Name_Id:arrName_Id,Email:arrEmail,Affiliated_Institution:arrAffiliated_Institution,Country:arrCountry,Corresponding:arrCorresponding,
                    Name2:ReviewName,Name_Id2:ReviewName_Id,Email2:ReviewEmail,Affiliated_Institution2:ReviewAffiliated_Institution,Country2:ReviewCountry,Invited_Date2:ReviewInvited_Date,Responsed2:ReviewResponsed,Responsed_Date2:ReviewResponsed_Date,Decision2:ReviewDecision,Completed_Date2 :ReviewCompleted_Date,
                    KeyWord:KeyWord,Category:Category,Sub_Category:Sub_Category
                });
            }
        });
    }catch (err) {
        res.status(404).send('查無此筆資料 <button  onclick="history.back()" >回上一頁</button>');
    }
})

module.exports = router;