const url = require("url");
const http = require("http");
const fs = require("fs");
const server = http
  .createServer(function (req, res) {
    if (req.url == "/") {
      res.setHeader("content-type", "text/html");
      fs.readFile("index.html", "utf8", (err, data) => {
        res.end(data);
      });
    }

    if (req.url.startsWith("/deportes") && req.method == "GET") {
      fs.readFile("data.json", "utf8", (err, data) => {
        res.end(data);
      });
    }

    if (req.url.startsWith("/agregar") && req.method == "POST") {
      let body;

      req.on("data", (payload) => {
        body = JSON.parse(payload);
      });

      req.on("end", () => {
        const {
          nombre,
          precio
        } = body;

        fs.readFile("data.json", "utf8", (err, data) => {
          let deportes = JSON.parse(data).deportes;
          deportes.push({
            nombre,
            precio,
          });

          fs.writeFile(
            "data.json",
            JSON.stringify({
              deportes,
            }),
            (err, data) => {
              err ? console.log(" oh oh...") : console.log(" OK ");
              res.end("Deporte agregado con exito");
            }
          );
        });
      });
    }

    if (req.url.startsWith("/editar") && req.method == "PUT") {
      let body;

      req.on("data", (payload) => {
        body = JSON.parse(payload);
      });

      req.on("end", () => {
        const {
          nombre,
          precio
        } = body;

        fs.readFile("data.json", "utf8", (err, data) => {
          let deportes = JSON.parse(data).deportes;
          deportes = deportes.map((d) => {
            if (d.nombre == nombre) {
              d.precio = precio;
              return d;
            }
            return d;
          });
          fs.writeFile(
            "data.json",
            JSON.stringify({
              deportes
            }),
            (err, data) => {
              err ? console.log(" oh oh...") : console.log(" OK ");
              res.end("Deporte editado con exito");
            }
          );
        });
      });
    }

    if (req.url.startsWith("/eliminar") && req.method == "DELETE") {
      const {
        nombre
      } = url.parse(req.url, true).query;
      fs.readFile("data.json", "utf8", (err, data) => {
        let deportes = JSON.parse(data).deportes;
        deportes = deportes.filter((d) => d.nombre !== nombre);
        fs.writeFile(
          "data.json",
          JSON.stringify({
            deportes,
          }),
          (err, data) => {
            err ? console.log(" oh oh...") : console.log(" OK ");
            res.end("Deporte elimado con exito");
          }
        );
      });
    }
  })
  .listen(3000);

module.exports = server;