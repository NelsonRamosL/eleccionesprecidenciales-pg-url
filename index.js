const http = require("http");
const fs = require("fs");
const { guardarCandidato } = require("./bd/consultas");


http.createServer((req, res) => {

    if (req.url == "/" && req.method == "GET") {
        console.log(req.Url)
        fs.readFile("index.html", (err, data) => {

            if (err) {
                res.statusCode = 500;
                res.end();
            } else {
                res.setHeader("content-type", "text/html");
                res.end(data);
            }
        })
    }


    if (req.url == "/candidato" && req.method == "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body = chunk.toString();
        });
console.log("en candidato")
        req.on("end", async () => {
            const candidato = JSON.parse(body);

            try {
                const result = await guardarCandidato(candidato);
                res.statusCode = 201;
                res.end(JSON.stringify(result));
            } catch (e) {
                res.statusCode = 500;
                res.end("ocurrio un error" + e);
            }



        })


    }






}).listen(3000, console.log("SERVER ON"))



