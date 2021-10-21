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

const result =  await pool.query(consulta);
return result;

}

module.exports = { guardarCandidato }
