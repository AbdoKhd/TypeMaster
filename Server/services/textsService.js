const { query } = require("../database/db");

const getTexts = async () =>{
    try{
        let sql = "select * from texts";
        const texts = await query(sql);
        console.log(texts);
        return texts;
    }catch(error){
        throw new Error(error);
    }

}
module.exports = {
    getTexts
}

