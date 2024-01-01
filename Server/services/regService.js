const { query } = require("../database/db");


const register = async (data) =>{
    const { username, password, email } = data;
    console.log(username, password, email);
    //const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    const sql = `INSERT INTO users (username, password, email) VALUES (?, ?, ?);`
    try {
        await query(sql, [username, password, email]);

        return { status: 200, message: "Successful registration"}
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
}

module.exports = {
    register,
}