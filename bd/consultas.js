const { Pool } = require("pg");
//const { pool } = require("pool");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "elecciones",
    port: 5432
})

const guardarCandidato = async (candidato) => {
    const values = Object.values(candidato);
    const consulta = {
        text: "INSERT INTO candidatos (nombre, foto, color, votos) values ($1,$2,$3,0)",
        values
    };
    const result = await pool.query(consulta);
    return result;
}


const getCandidatos = async () => {
    const result = await pool.query("SELECT * FROM candidatos");
    return result.rows;
}




const editarCandidato = async (candidato) => {
    const values = Object.values(candidato);
    const consulta = {
        text: "UPDATE candidatos SET nombre=$1, foto=$2 WHERE id=$3 RETURNING *",
        values
    };
    const result = await pool.query(consulta);
    return result;
}




const eliminarCandidato = async (id) => {
    const result = await pool.query(`DELETE FROM candidatos WHERE id = ${id}`);
    return result.rows;
}





const registroVotos = async (voto) => {
    const values = Object.values(voto);


    const registrarBotoHistorial = {
        text: "INSERT INTO historial (estado, votos, ganador) values ($1,$2,$3)",
        values
    };



    const registrarVotoCandidato = {
        text: "UPDATE candidatos SET votos=votos+$1 WHERE nombre=$2",
        values: [Number(values[1]), values[2]]
    };


    try {
        await pool.query("BEGIN");
        await pool.query(registrarBotoHistorial);
        await pool.query(registrarVotoCandidato);
        await pool.query("COMMIT");
        return true;
    } catch (e) {
        console.log("error base de datos",e)
        await Pool.query("ROLLBACK");
        throw e;
    }




}




const getHistorial = async () => {
    const consulta = {
text : "SELECT * FROM historial",
rowMode: "array"
    };

    const result = await pool.query(consulta);
    return result.rows;
}







module.exports = { guardarCandidato, getCandidatos, editarCandidato, eliminarCandidato,registroVotos,getHistorial }
