const dbo = require('./index');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var engine = require('ejs');
var router = express.Router();
const config = require('./dbconfig')
const sql = require('mssql');
const { database } = require('./dbconfig');
const fetch = require('node-fetch');


// const SummaryRoute1 = require('./SelectSummary');
const SummaryRoute = require('./SelectSummary');
const SelectRoute = require('./Select');
const KeyWordRoute = require('./SelectKeyWord');
const AuthorRoute = require('./SelectAuthor');
const ReviewRoute = require('./SelectReview');
const AuthorNameRoute = require('./SelectNameAuthor');
const NamelistRoute = require('./SelectName_list');
const CategoryRoute = require('./SelectCategory');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.set('view engine', 'ejs');
app.set('views', './views');



router.use((request,response,next)=>{
    console.log('middlware');
    next();
})


app.use('/ManuscriptEdit1', SelectRoute);
app.use('/AuthorEdit1', AuthorRoute);
app.use('/ReviewEdit1', ReviewRoute);
app.use('/Name_list1', NamelistRoute);
app.use('/Author/Name', AuthorNameRoute);
app.use('/KeyWordEdit1', KeyWordRoute);
app.use('/KeyWordCategoryEdit1', CategoryRoute);
app.use('/SummaryTable', SummaryRoute);
// app.use('/SummaryTable1', SummaryRoute1);


app.get('/login', function(req, res) {       
    res.render('login.ejs')
});

app.get('/home', function(req, res) {       
    res.render('home.ejs')
});


app.post('/login', async (req, res)=>{
    const output = {
        body: req.body,
        success: false,
    }  
    let pool = await sql.connect(config);
    const pp = await pool.query(`SELECT * from [開發測試用MSN].[dbo].[admin] WHERE username = '${req.body.username}' AND password= '${req.body.password}'`);
    // const [rs] = await pool.query(pp, [req.body.username, req.body.password]);
    // console.log(pp)
    if( pp.rowsAffected[0] > 0){
        let login = {...req.body}
        }
            else{
                res.status(404).send({error:"帳號密錯誤"})
            }
    res.json(output);
    })

// 搜尋ManuscriptNumber表單
app.get('/ManuscriptEdit',function(req,res,next){
    dbo.getManuscriptlist()
    .then(result=>
        res.json(result[0]))
});
app.get('/ManuscriptEdit/:Manuscript_Number',function(req,res,next){
    dbo.getManuscript(req.params.Manuscript_Number)
    .then(result=>
        res.json(result))
});

// 搜尋KeyWord表單
app.get('/KeyWordEdit',function(req,res,next){
    dbo.getKeyWordlist()
    .then(result=>
        res.json(result[0]))
});

app.get('/KeyWordEdit/:Manuscript_Number',function(req,res,next){
    dbo.getKeyWord(req.params.Manuscript_Number)
    .then(result=>
        res.json(result))
        // console.log(321)
        // console.log(req.params.Manuscript_Number)
});

app.get('/NBCategoryEdit/:Manuscript_Number',function(req,res,next){
    dbo.getCategory(req.params.Manuscript_Number)
    .then(result=>
        res.json(result))
        // console.log(321)
        // console.log(req.params.Manuscript_Number)
});


app.get('/Sub_CategoryEdit/:Category', async function(req,res,next){
    dbo. getSub_Category(req.params.Category)
    .then(result=>
        res.json(result))
        // console.log(321)
        // console.log(req.params.Manuscript_Number)
});



// 搜尋Author表單
app.get('/AuthorEdit',function(req,res,next){
    dbo.getAuthorlist()
    .then(result=>
        res.json(result[0]))
});
app.get('/AuthorEdit/:Manuscript_Number/:Name',function(req,res,next){
    dbo.getAuthor(req.params.Manuscript_Number,req.params.Name)
    .then(result=>
        res.json(result))
        // console.log(321)
        // console.log(req.params.Manuscript_Number)
});

app.get('/AuthorEdit/:Manuscript_Number',function(req,res,next){
    dbo.getManuscriptAuthor(req.params.Manuscript_Number)
    .then(result=>
        res.json(result))
        // console.log(321)
        // console.log(req.params.Manuscript_Number)
});

app.get('/Namesearch/:Name',function(req,res,next){
    dbo.getName(req.params.Name)
    .then(result=>
        res.json(result))
        // console.log(321)
        // console.log(req.params.Manuscript_Number)
});

app.get('/Namesearch/:Name/:Name_Id',function(req,res,next){
    dbo.getNameSid(req.params.Name,req.params.Name_Id)
    .then(result=>
        res.json(result))
});


// 搜尋Review表單
app.get('/ReviewEdit',function(req,res,next){
    dbo.getReviewlist()
    .then(result=>
        res.json(result[0]))
});
app.get('/ReviewEdit/:Manuscript_Number/:Name',function(req,res,next){
    dbo.getReview(req.params.Manuscript_Number,req.params.Name)
    .then(result=>
        res.json(result))
        // console.log(321)
        // console.log(req.params.Manuscript_Number)
});


app.get('/ALL/:Manuscript_Number',async function(req,res,next){
    let Manuscript_Number = await (await dbo.getALLManuscript_Number(req.params.Manuscript_Number)).recordset;
    let Author = await dbo.getALLAuthor(req.params.Manuscript_Number);
    let Review = await dbo.getALLReview(req.params.Manuscript_Number);
    let KeyWord = await dbo.getaALLKeyWord(req.params.Manuscript_Number);
    let Category = await dbo.getALLManuscript_Category(req.params.Manuscript_Number);
    let array3 = Manuscript_Number.concat(Author,Review,KeyWord,Category);
    res.json(array3);
});

app.get('/ALL',function(req,res,next){

   dbo.getManuscriptlist()
    .then(result=>
        res.json(result))
    // let array3 = a.concat(b,c)
// console.log(array3)
});


// 網址
app.get('/SummaryTable1', function(req, res) {       
    res.render('SummaryTable1')
});

app.get('/SummaryTable', function(req, res) {       
    res.render('SummaryTable')
});

app.get('/Manuscript', function(req, res) {       
    res.render('Manuscript')
});

app.get('/ManuscriptEdit1', function(req, res) {       
    res.render('ManuscriptEdit1')
});

app.get('/KeyWordEdit1', function(req, res) {       
    res.render('KeyWordEdit1')
});

app.get('/KeyWordCategoryadd', function(req, res) {       
    res.render('KeyWordCategoryadd')
});
app.get('/KeyWordSub_Categoryadd', function(req, res) {       
    res.render('KeyWordSub_Categoryadd')
});

app.get('/CategoryEdit', function(req, res) {       
    res.render('CategoryEdit')
});

app.get('/Sub_CategoryEdit', function(req, res) {       
    res.render('Sub_CategoryEdit')
});

app.get('/KeyWordCategoryEdit1', function(req, res) {       
    res.render('KeyWordCategoryEdit1')
});

app.get('/AuthorEdit1', function(req, res) {       
    res.render('AuthorEdit1')
});

// app.get('/AuthorName', function(req, res) {       
//     res.render('AuthorName')
// });

app.get('/ReviewEdit1', function(req, res) {       
    res.render('ReviewEdit1')
});

app.get('/Name_list1', function(req, res) {       
    res.render('Name_list1')
});


app.get('/keyword', function(req, res) {       
    res.render('keyword')
});

app.get('/Author', function(req, res) {       
    res.render('Author')
});

app.get('/Review', function(req, res) {       
    res.render('Review')
});




// 新增Manuscript_Number
app.post('/ManuscriptNBAdd', async function (request, response){
    let pool = await sql.connect(config);
    // let rs =  ManuscriptNB.Manuscript_Number
    const pp = await pool.query(`SELECT * from [開發測試用MSN].[dbo].[Manuscript_Number] WHERE Manuscript_Number = '${request.body.Manuscript_Number}'`);
    // console.log(pp)
    if(pp.rowsAffected[0] === 0){
        let ManuscriptNB = {...request.body}
        dbo.AddManuscriptNB(ManuscriptNB).then(result => {response.json(result)
        })
    }
    else{
        response.status(404).send({error:"新增失敗"})
    }
})

// 新增Status_record
app.post('/ManuscriptNBEdit/:Manuscript_Number', async (req, res)=>{
    const ManuscriptEdit = {
        body: req.body,
        success: false,
    }  
    let pool = await sql.connect(config);
    const MSEdit = await pool.query(`  UPDATE [開發測試用MSN].[dbo].[Manuscript_Number]　SET 　Manuscript_Title = '${req.body.Manuscript_Title}' ,[Initial_DateSubmitted] = '${req.body.Initial_DateSubmitted}', [Status]= '${req.body.Status}' , [Status_Date]= '${req.body.Status_Date}', [Handing_editor]= '${req.body.Handing_editor}'　where Manuscript_Number='${req.body.Manuscript_Number}'`);
    const SDAdd = await pool.query(`INSERT INTO [開發測試用MSN].[dbo].[Status_record] (Manuscript_Number,Status,Status_Date)VALUES ('${req.body.Manuscript_Number}','${req.body.Status}','${req.body.Status_Date}')`)
    if( MSEdit.rowsAffected[0] > 0){
        let MMEdit = {...req.body}
    }
        else{
            res.status(404).send({error:"修正失敗"})
        }
    res.json(ManuscriptEdit);

    });

// 新增KeyWord
// 以;分割KeyWord
app.post('/KeyWordAdd', async function(request, response){
    let pool = await sql.connect(config);
    const pp = await pool.query(`SELECT * from [開發測試用MSN].[dbo].[KeyWord] WHERE Manuscript_Number = '${request.body.Manuscript_Number}'`);
    if(pp.rowsAffected[0] === 0){
        let KeyWord = {...request.body}
        let myStr = request.body.KeyWord
        var strArray = myStr.split("; ");
        // console.log(strArray)
        dbo.AddKeyWord(KeyWord,strArray).then(result => {response.json(result);})
    }else{
        response.status(404).send({error:"新增失敗"})
    }
})

// 新增Sub_Category
app.post('/KeyWordSub_CategoryAdd', async function(request, response){
    let pool = await sql.connect(config);
    console.log(request.body)
    if(request.body.Share ==='1'){
        const Add = await pool.query(`INSERT INTO [開發測試用MSN].[dbo].[Common_Sub_Category](Common_Sub_Category)　VALUES('${request.body.Sub_Category}')`)
        const SDAdd = await pool.query(`INSERT INTO [開發測試用MSN].[dbo].[KeyWord_Category] (Category,Sub_Category)select distinct [Category],'${request.body.Sub_Category}' from [開發測試用MSN].[dbo].[KeyWord_Category]`)
        response.json();
    }else{
        const SDAdd = await pool.query(`INSERT INTO [開發測試用MSN].[dbo].[KeyWord_Category] (Category,Sub_Category)　VALUES ('${request.body.Category}','${request.body.Sub_Category}')`)
        response.json();
    }
});

// 修改KeyWord
app.post('/KeyWordChangeEdit', async (req, res)=>{
    let pool = await sql.connect(config);
    console.log(req.body.Manuscript_Number)
    const pp = await pool.query(`DELETE FROM [開發測試用MSN].[dbo].[KeyWord] where Manuscript_Number='${req.body.Manuscript_Number}'`);
    {
        let KeyWord = {...req.body}
        let myStr = req.body.KeyWord
        var strArray = myStr;
        // console.log(strArray)
        dbo.EditKeyWord(KeyWord,strArray).then(result => {res.json(result);
        })
    }
});

app.get('/KeyWordCategory',(req, res)=>{
    dbo.getKeyWordCategory()
    .then(result=>
        res.json(result[0]))
    })

app.get('/KeyWordSub_Category',(req, res)=>{
    dbo. getKeyWordSub_Category()
    .then(result=>
        res.json(result[0]))
    })

// Category修改
app.post('/CategoryEdit', async (req, res)=>{
    const CategoryEdit = {
        body: req.body,
        success: false,
    }  
    let pool = await sql.connect(config);
    const KWEdit = await pool.query(`UPDATE [開發測試用MSN].[dbo].[KeyWord_Category]　SET Category = '${req.body.Category_new}' where Category='${req.body.Category}'`);
    const Kdit = await pool.query(`UPDATE [開發測試用MSN].[dbo].[Manuscript_Number_Category]　SET Category = '${req.body.Category_new}' where Category='${req.body.Category}'`);
        if( KWEdit.rowsAffected[0] >= 0){
            let KWEdit = {...req.body}
        }
        else{
            res.status(404).send({error:"修正失敗"})
        }
        res.json(CategoryEdit);
});

// Sub_Category修改
app.post('/Sub_CategoryEdit', async (req, res)=>{
    const CategoryEdit = {
        body: req.body,
        success: false,
    }  
    if (req.body.Share === '0'){
        let pool = await sql.connect(config);
        const KWEdit = await pool.query(`UPDATE [開發測試用MSN].[dbo].[KeyWord_Category]　SET Sub_Category = '${req.body.Sub_Category_new}' where Sub_Category='${req.body.Sub_Category}'and Category='${req.body.Category}'`);
        const Kdit = await pool.query(`UPDATE [開發測試用MSN].[dbo].[Manuscript_Number_Category]　SET Sub_Category = '${req.body.Sub_Category_new}' where Sub_Category='${req.body.Sub_Category}'and Category='${req.body.Category}'`);
    }else{
        let pool = await sql.connect(config);
        const comEdit = await pool.query(`UPDATE [開發測試用MSN].[dbo].[Common_Sub_Category]　SET Common_Sub_Category = '${req.body.Sub_Category_new}' where Common_Sub_Category='${req.body.Sub_Category}'`);
        const hhEdit = await pool.query(`UPDATE [開發測試用MSN].[dbo].[KeyWord_Category]　SET Sub_Category = '${req.body.Sub_Category_new}' where Sub_Category='${req.body.Sub_Category}'`);
        const ddKdit = await pool.query(`UPDATE [開發測試用MSN].[dbo].[Manuscript_Number_Category]　SET Sub_Category = '${req.body.Sub_Category_new}' where Sub_Category='${req.body.Sub_Category}'`);
    }
    res.json(CategoryEdit);       
});

// Manuscript_Number修改Category
app.post('/NBCategoryEdit', async (req, res)=>{
    const CategoryEdit = {
        body: req.body,
        success: false,
    }  
    let pool = await sql.connect(config);       
    const Kdit = await pool.query(`UPDATE [開發測試用MSN].[dbo].[Manuscript_Number_Category]　SET Sub_Category = '${req.body.Sub_Category}', Category = '${req.body.Category}' where Manuscript_Number='${req.body.Manuscript_Number}'`);
    if( Kdit.rowsAffected[0] >= 0){
        let Kdit = {...req.body}
    }else{
        res.status(404).send({error:"修正失敗"})
    }
    res.json(CategoryEdit);
});

// 刪除Category
app.post('/Categorydel', async (req, res)=>{
    const CategoryDel = {
        body: req.body,
        success: false,
    }  
    let pool = await sql.connect(config);
    const CategorydelDel1 = await pool.query(`UPDATE [開發測試用MSN].[dbo].[Manuscript_Number_Category]　SET Category = null, Sub_Category = null where Category='${req.body.Category}'`);
    const CategorydelDel2 = await pool.query(`DELETE FROM [開發測試用MSN].[dbo].[KeyWord_Category] where Category = '${req.body.Category}'`);
    if( CategorydelDel2.rowsAffected[0] >= 0){
        let CategorydelDel2 = {...req.body}
    }else{
        res.status(404).send({error:"修正失敗"})
    }
    res.json(CategoryDel);
});


// Sub_Category刪除
app.post('/Sub_Categorydel', async (req, res)=>{
    const CategoryDel = {
        body: req.body,
        success: false,
    }  
    if (req.body.Share === '0'){
        let pool = await sql.connect(config);
        const CategorydelDel1 = await pool.query(`UPDATE [開發測試用MSN].[dbo].[Manuscript_Number_Category]　SET  Sub_Category = null where Category='${req.body.Category}' and Sub_Category='${req.body.Sub_Category}'`);
        const CategorydelDel2 = await pool.query(`DELETE FROM [開發測試用MSN].[dbo].[KeyWord_Category] where Category = '${req.body.Category}' and Sub_Category='${req.body.Sub_Category}'`);
    }else{
        let pool = await sql.connect(config);
        const CategorydelDel3 = await pool.query(`UPDATE [開發測試用MSN].[dbo].[Manuscript_Number_Category]　SET  Sub_Category = null where Sub_Category='${req.body.Sub_Category}'`);
        const CategorydelDel4 = await pool.query(`DELETE FROM [開發測試用MSN].[dbo].[KeyWord_Category] where Sub_Category='${req.body.Sub_Category}'`);
        const CategorydelDel5 = await pool.query(`DELETE FROM [開發測試用MSN].[dbo].[Common_Sub_Category] where Common_Sub_Category ='${req.body.Sub_Category}'`);
    }
    res.json(CategoryDel);
});

// Author修改
app.post('/AuthorChangeEdit/:Manuscript_Number/:Name', async (req, res)=>{
    const AuthorEdit = {
        body: req.body,
        success: false,
    }  
    let pool = await sql.connect(config);

    let CKName= await pool.query(`Select * from [開發測試用MSN].[dbo].[Name_list] where Name= N'${req.body.Name}' and Name_Id='${req.body.Name_Id}'`)
    if( CKName.rowsAffected[0] === 0){
          const Add = await pool.query(`INSERT INTO [開發測試用MSN].[dbo].[Name_list] ( Name, Email, Affiliated_Institution,Country) VALUES (N'${req.body.Name}','${req.body.Email}','${req.body.Affiliated_Institution}','${req.body.Country}')`)
    }else{
        const Addd = await pool.query(`UPDATE [開發測試用MSN].[dbo].[Name_list] SET  Email='${req.body.Email}', Affiliated_Institution ='${req.body.Affiliated_Institution}',Country = '${req.body.Country}' WHERE Name = N'${req.body.Name}' and Name_Id='${req.body.Name_Id}'`)
    }

    const ATEdit = await pool.query(`UPDATE [開發測試用MSN].[dbo].[Author]　SET Name = N'${req.body.Name}', Email = '${req.body.Email}', Affiliated_Institution = '${req.body.Affiliated_Institution}', Country = '${req.body.Country}', Corresponding = '${req.body.Corresponding}' where Manuscript_Number='${req.body.Manuscript_Number}'and  Name = N'${req.body.Name}'`);
    if( ATEdit.rowsAffected[0] > 0){
        let ATEdit = {...req.body}
    }else{
        res.status(404).send({error:"修正失敗"})
    }
    res.json(AuthorEdit);
});

// Review修改
app.post('/ReviewChangeEdit/:Manuscript_Number/:Name', async (req, res)=>{
    const ReviewEdit = {
        body: req.body,
        success: false,
    }  
    let pool = await sql.connect(config);
    let CKName= await pool.query(`Select * from [開發測試用MSN].[dbo].[Name_list] where Name= N'${req.body.Name}'and Name_Id='${req.body.Name_Id}'`)
    if( CKName.rowsAffected[0] === 0){
        const Add = await pool.query(`INSERT INTO [開發測試用MSN].[dbo].[Name_list] ( Name, Email, Affiliated_Institution,Country) VALUES (N'${req.body.Name}','${req.body.Email}','${req.body.Affiliated_Institution}','${req.body.Country}')`)
    }else{
        const Addd = await pool.query(`UPDATE [開發測試用MSN].[dbo].[Name_list] SET  Email='${req.body.Email}', Affiliated_Institution ='${req.body.Affiliated_Institution}',Country = '${req.body.Country}' WHERE Name = N'${req.body.Name}'and Name_Id='${req.body.Name_Id}'`)
    }   
    const RVEdit = await pool.query(`UPDATE [開發測試用MSN].[dbo].[Review]　SET Affiliated_Institution = '${req.body.Affiliated_Institution}', Email = '${req.body.Email}',  Country = '${req.body.Country}', Invited_Date = '${req.body.Invited_Date}', Responsed = '${req.body.Responsed}',Responsed_Date = '${req.body.Responsed_Date}',Decision = '${req.body.Decision}',Completed_Date = '${req.body.Completed_Date}' where Manuscript_Number='${req.body.Manuscript_Number}'and  Name = N'${req.body.Name}'`);
        if( RVEdit.rowsAffected[0] > 0){
            let RVEdit = {...req.body}
        }else{
            res.status(404).send({error:"修正失敗"})
        }
        res.json(ReviewEdit);
});
    

// 新增Author
app.post('/Authoradd', function(request, response){

    let Author = {...request.body}

    dbo.AddAuthor(Author).then(result => {response.json(result);
    })
});

// 新增Review
app.post('/Reviewadd', function(request, response){

    let Review = {...request.body}

    dbo.AddReview(Review).then(result => {response.json(result);
    })
});
    

// 新增共通子分類
app.post('/KeyWordCategoryAdd', async function(request, response){
    let KeyWordCategory = {...request.body}
    let pool = await sql.connect(config);
    let pp = await pool.query(`SELECT * from [開發測試用MSN].[dbo].[Common_Sub_Category]`);
    console.log(pp)
    dbo.CategoryAdd(KeyWordCategory,pp).then(result => {response.json(result);
    })
})



var port = process.env.port || 3333;
app.listen(port);
console.log('Order API IS RU' + port);




