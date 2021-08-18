const config = require('./dbconfig')
const sql = require('mssql');


async function getALLManuscript_Number(Manuscript_Number) {
    try {   
        let pool = await sql.connect(config);
        let product = await pool.request()
        .input('input_parameter', sql.NVarChar, Manuscript_Number)
        .query("SELECT * from Manuscript_Number where Manuscript_Number = @input_parameter" )
        return product;
    }
    catch (error) {
        console.log(error);
    }
}


async function getALLAuthor(Manuscript_Number) {
    try {   
        let pool = await sql.connect(config);
        let product2 = await pool.request()
        .input('input_parameter', sql.NVarChar, Manuscript_Number)
        .query("SELECT * from Author where Manuscript_Number = @input_parameter" )
        return product2.recordsets;  
    }
    catch (error) {
        console.log(error);
    }
}

async function getALLReview(Manuscript_Number) {
    try {   
        let pool = await sql.connect(config);
        let product2 = await pool.request()
        .input('input_parameter', sql.NVarChar, Manuscript_Number)
        .query("SELECT * from Review where Manuscript_Number = @input_parameter" )
        return product2.recordsets;  
    }
    catch (error) {
     console.log(error);
    }
}

async function getaALLKeyWord(Manuscript_Number) {
    try {   
        let pool = await sql.connect(config);
        let product2 = await pool.request()
        .input('input_parameter', sql.NVarChar, Manuscript_Number)
        .query("SELECT * from KeyWord where Manuscript_Number = @input_parameter" )
        return product2.recordsets;  
    }
    catch (error) {
        console.log(error);
    }
}




async function getManuscriptlist() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from Manuscript_Number");
        return products.recordsets;
        }
    catch (error) {
        console.log(error);
    }
}

async function getManuscript(Manuscript_Number) {
    try {   
        let pool = await sql.connect(config);
        let product = await pool.request()
        .input('input_parameter', sql.NVarChar, Manuscript_Number)
        .query("SELECT * from Manuscript_Number where Manuscript_Number = @input_parameter");
        return product.recordsets;  
    }
    catch (error) {
        console.log(error);
    }
}

async function getKeyWordlist() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from KeyWord");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getKeyWord(Manuscript_Number) {
    try {   
        let pool = await sql.connect(config);
        let product = await pool.request()
        .input('input_Manuscript_Number', sql.NVarChar, Manuscript_Number)
        .query("SELECT * from KeyWord where Manuscript_Number = @input_Manuscript_Number");
        return product.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}


async function getKeyWordCategory(Category) {
    try {   
        let pool = await sql.connect(config);
        let Category = await pool.request()
        .query("SELECT distinct Category from KeyWord_Category");
        return Category.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}


async function getKeyWordSub_Category(Category) {
    try {   
        let pool = await sql.connect(config);
        let Category = await pool.request()
        .query("SELECT distinct Sub_Category from KeyWord_Category");
        return Category.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}


async function getAuthorlist() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from Author");
        return products.recordsets;
        }
    catch (error) {
        console.log(error);
    }
}

async function getAuthor(Manuscript_Number,Name) {
    try {   
        let pool = await sql.connect(config);
        let product = await pool.request()
        .input('input_parameter', sql.NVarChar, Manuscript_Number)
        .input('input_Name', sql.NVarChar, Name)
        .query("SELECT * from Author where Manuscript_Number = @input_parameter and Name = @input_Name");
        return product.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}


async function getManuscriptAuthor(Manuscript_Number) {
    try {   
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.NVarChar, Manuscript_Number)
            .query("SELECT * from Author where Manuscript_Number = @input_parameter");
        return product.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}


async function getName(Name) {
    try {   
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_Name', sql.NVarChar, Name)
            .query("SELECT * from Name_list where Name = @input_Name");
        return product.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getNameSid(Name,Name_Id) {
    try {   
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_Name_Id', sql.NVarChar, Name_Id)
            .input('input_Name', sql.NVarChar, Name)
            .query("SELECT * from Name_list where Name = @input_Name and Name_Id = @input_Name_Id");
        return product.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}




async function getReviewlist() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from Review");
        return products.recordsets;
        }
    catch (error) {
        console.log(error);
    }
}

async function getReview(Manuscript_Number,Name) {
    try {   
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.NVarChar, Manuscript_Number)
            .input('input_Name', sql.NVarChar, Name)
            .query("SELECT * from Review where Manuscript_Number = @input_parameter and Name = @input_Name");
        return product.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function AddKeyWord (KeyWord,strArray) {
    try {
        let pool = await sql.connect(config);
        let AKAdd = await pool.query(`INSERT INTO [開發測試用MSN].[dbo].[Manuscript_Number_Category] (Manuscript_Number,Category,Sub_Category)VALUES ('${KeyWord.Manuscript_Number}','${KeyWord.Category}','${KeyWord.Sub_Category}')`);
        // console.log(KeyWord)
    var i=0
    while(i<strArray.length){
        let pool = await sql.connect(config);
        let insertProduct  = await pool.request()
            .input('Manuscript_Number',sql.NVarChar,KeyWord.Manuscript_Number)
            .input('KeyWord',sql.NVarChar,strArray[i])
            .execute('InsertKeyWord');
            i++;
        // return AKAdd .recordsets;
        
        }
    }  
        catch (err) {
            console.log(err);
        }
    }

    async function EditKeyWord (KeyWord,strArray) {
        try {
        var i=0
        while(i<strArray.length){
            let pool = await sql.connect(config);
            let insertProduct  = await pool.request()
                .input('Manuscript_Number',sql.NVarChar,KeyWord.Manuscript_Number)
                .input('KeyWord',sql.NVarChar,strArray[i])
                .execute('InsertKeyWord');
                i++;
            // return AKAdd .recordsets;
            }
        }  
            catch (err) {
                console.log(err);
            }
        }

    async function CategoryAdd (Category,Common_Sub_Category) {
        try {
            // console.log(Category)
            // console.log(988)
            // console.log(Common_Sub_Category.recordset.length)
            var i=0
            while(i<Common_Sub_Category.recordset.length){
            let pool = await sql.connect(config);
            const SDAdd = await pool.query(`INSERT INTO [開發測試用MSN].[dbo].[KeyWord_Category] (Category,Sub_Category)VALUES ('${Category.Category}','${Common_Sub_Category.recordset[i].Common_Sub_Category}')`)
            i++;
            }
            // let insertProduct  = await pool.request()
            //     .input('Category',sql.NVarChar,Category.Category)
            //     .execute('InsertKeyWord_Category')     
            // return insertProduct .recordsets;
        }  
            catch (err) {
                console.log(err);
            }
        }


    

    async function AddManuscriptNB (ManuscriptNB) {
        try {
            // console.log(ManuscriptNB.Status_Date)
            let pool = await sql.connect(config);
            const SDAdd = await pool.query(`INSERT INTO [開發測試用MSN].[dbo].[Status_record] (Manuscript_Number,Status,Status_Date)VALUES ('${ManuscriptNB.Manuscript_Number}','${ManuscriptNB.Status}','${ManuscriptNB.Status_Date}')`)
            let insertProduct  = await pool.request()
                .input('Manuscript_Number',sql.NVarChar,ManuscriptNB.Manuscript_Number)
                .input('Manuscript_Title',sql.NVarChar,ManuscriptNB.Manuscript_Title)
                .input('Initial_DateSubmitted',sql.NVarChar,ManuscriptNB.Initial_DateSubmitted)
                .input('Status',sql.NVarChar,ManuscriptNB.Status)
                .input('Status_Date',sql.NVarChar,ManuscriptNB.Status_Date)
                .input('Handing_editor',sql.NVarChar,ManuscriptNB.Handing_editor)
                .execute('InsertManuscriptNB')
                // console.log(ManuscriptNB.Manuscript_Number)
            return insertProduct .recordsets;
            }      
        catch (err) {
            console.log(err);
            }
    }

        async function AddAuthor (Author) {
            try {
                let pool = await sql.connect(config);
                let CKName= await pool.query(`Select * from [開發測試用MSN].[dbo].[Name_list] where Name= N'${Author.Name}' and Name_Id= N'${Author.Name_Id}'`)
                console.log(CKName)
                if( CKName.rowsAffected[0] === 0){
                  const Add = await pool.query(`INSERT INTO [開發測試用MSN].[dbo].[Name_list] (Name, Name_Id, Email, Affiliated_Institution,Country) VALUES (N'${Author.Name}','${Author.Name_Id}','${Author.Email}','${Author.Affiliated_Institution}','${Author.Country}')`)
                }else{
                    const Addd = await pool.query(`UPDATE [開發測試用MSN].[dbo].[Name_list] SET Email='${Author.Email}', Affiliated_Institution ='${Author.Affiliated_Institution}',Country = '${Author.Country}' WHERE Name = N'${Author.Name}'`)
                }

                let insertProduct  = await pool.request()
                    .input('Manuscript_Number',sql.NVarChar,Author.Manuscript_Number)
                    .input('Order',sql.NVarChar,Author.Order)
                    .input('Name',sql.NVarChar,Author.Name)
                    .input('Name_Id',sql.NVarChar,Author.Name_Id)
                    .input('Email',sql.NVarChar,Author.Email)
                    .input('Affiliated_Institution',sql.NVarChar,Author.Affiliated_Institution)
                    .input('Country',sql.NVarChar,Author.Country)
                    .input('Corresponding',sql.NVarChar,Author.Corresponding)
                    .execute('InsertAuthor')     
                return insertProduct .recordsets;
            }  
                catch (err) {
                    console.log(err);
                }
        }


    async function getKeyWordlist() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from KeyWord");
        return products.recordsets;
        }
    catch (error) {
        console.log(error);
    }
}

    async function getKeyWord(Manuscript_Number) {
    try {   

        let pool = await sql.connect(config);

        let product = await pool.request()
            .input('input_parameter', sql.NVarChar, Manuscript_Number)
            .query("SELECT * from KeyWord where Manuscript_Number = @input_parameter");
        return product.recordsets;
   
    }
    catch (error) {
        console.log(error);
    }
}


async function getALLManuscript_Category(Manuscript_Number) {
    try {   

        let pool = await sql.connect(config);

        let product = await pool.request()
            .input('input_parameter', sql.NVarChar, Manuscript_Number)
            .query("SELECT * from Manuscript_Number_Category where Manuscript_Number = @input_parameter");
        return product.recordsets;
   
    }
    catch (error) {
        console.log(error);
    }
}


async function AddReview (Review) {
    try {
        let pool = await sql.connect(config);
        let CKName= await pool.query(`Select * from [開發測試用MSN].[dbo].[Name_list] where Name= N'${Review.Name}'and Name_Id= '${Review.Name_Id}'`)
        if( CKName.rowsAffected[0] === 0){
            const Add = await pool.query(`INSERT INTO [開發測試用MSN].[dbo].[Name_list] ( Name, Name_Id, Email, Affiliated_Institution,Country) VALUES (N'${Review.Name}','${Review.Name_Id}','${Review.Email}','${Review.Affiliated_Institution}','${Review.Country}')`)
        }else{
            const Addd = await pool.query(`UPDATE [開發測試用MSN].[dbo].[Name_list] SET  Email='${Review.Email}', Affiliated_Institution ='${Review.Affiliated_Institution}',Country = '${Review.Country}' WHERE Name = N'${Review.Name}'`)
        }
            let insertProduct  = await pool.request()
            .input('Manuscript_Number',sql.NVarChar,Review.Manuscript_Number)
            .input('Name',sql.NVarChar,Review.Name)
            .input('Name_Id',sql.NVarChar,Review.Name_Id)
            .input('Affiliated_Institution',sql.NVarChar,Review.Affiliated_Institution)
            .input('Email',sql.NVarChar,Review.Email)
            .input('Country',sql.NVarChar,Review.Country)
            .input('Invited_Date',sql.NVarChar,Review.Invited_Date)
            .input('Responsed',sql.NVarChar,Review.Responsed)
            .input('Responsed_Date',sql.NVarChar,Review.Responsed_Date)
            .input('Decision',sql.NVarChar,Review.Decision)
            .input('Completed_Date',sql.NVarChar,Review.Completed_Date)
            .execute('InsertReview')     
            return insertProduct .recordsets;
    }  
    catch (err) {
        console.log(err);
    }
}
        
async function getNameSid(Name,Name_Id) {
    try {   
        let pool = await sql.connect(config);
        let product = await pool.request()
        .input('input_Name_Id', sql.NVarChar, Name_Id)
        .input('input_Name', sql.NVarChar, Name)
        .query("SELECT * from Name_list where Name = @input_Name and Name_Id = @input_Name_Id");
        return product.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getCategory(Manuscript_Number) {
    try {   
        let pool = await sql.connect(config);
        let product = await pool.request()
        .input('input_Manuscript_Number', sql.NVarChar, Manuscript_Number)
        .query("SELECT * from Manuscript_Number_Category where Manuscript_Number = @input_Manuscript_Number");
        return product.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getSub_Category(Category) {
    try {   
        // console.log(Category)
        let pool = await sql.connect(config);
        const pp = await pool.query(`SELECT * from [開發測試用MSN].[dbo].[KeyWord_Category] WHERE Category = '${Category}'`);
        return pp.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}



module.exports = {
    AddKeyWord: AddKeyWord,
    AddManuscriptNB:AddManuscriptNB,
    AddAuthor:AddAuthor,
    AddReview:AddReview,
    getManuscriptlist:getManuscriptlist,
    getManuscript:getManuscript,
    getKeyWordlist : getKeyWordlist,
    getKeyWord :getKeyWord,
    getAuthorlist:getAuthorlist,
    getAuthor:getAuthor,
    getReviewlist:getReviewlist,
    getReview:getReview,
    getName:getName,
    getKeyWordCategory:getKeyWordCategory,
    CategoryAdd:CategoryAdd,
    getNameSid:getNameSid,
    getCategory:getCategory,
    EditKeyWord:EditKeyWord,
    getManuscriptAuthor:getManuscriptAuthor,
    getALLManuscript_Number:getALLManuscript_Number,
    getALLAuthor:getALLAuthor,
    getALLReview:getALLReview,
    getaALLKeyWord:getaALLKeyWord,
    getALLManuscript_Category:getALLManuscript_Category,
    getKeyWordSub_Category:getKeyWordSub_Category,
    getSub_Category:getSub_Category

}