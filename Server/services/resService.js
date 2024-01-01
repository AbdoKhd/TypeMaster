const { query } = require("../database/db");


const saveRes = async (data) =>{
    const { textId, wpm, raw, time, userId } = data;
    console.log(wpm, raw, time);
    const sql = `INSERT INTO latest (latest_text, latest_wpm, latest_raw, latest_time, userId) VALUES (?, ?, ?, ?, ?);`
    try {
        await query(sql, [textId, wpm, raw, time, userId]);

        return { status: 200, message: "Successful saved results"}
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
}

const getRes = async (userId) => {
    try{
        let sql = "select latest_text, latest_wpm, latest_raw, latest_time from latest where userId = ?";
        const results = await query(sql, [userId]);
        console.log(results);
        return results;
    }catch(error){
        throw new Error(error);
    }
}

module.exports = {
    saveRes,
    getRes
}