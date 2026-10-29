const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/imagen" && req.method === "GET") {
      const imagen = await fs.readFile(path.join(__dirname, "imagen.png"));

      res.statusCode = 200;
      res.setHeader("Content-Type", "image/png");
      res.end(imagen);
    } else if (req.url === "/data" && req.method === "POST") {
      const contenido = {
        curso: "BackEnd",
        tema: "node.js",
      };

      await fs.writeFile(
        path.join(__dirname, "data.json"),
        JSON.stringify(contenido, null, 2),
        "utf8",
      );

      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(
        JSON.stringify({
          mensaje: "Archivo data.json creado correctamente",
        }),
      );
    } else if (req.url === "/update" && req.method === "PUT") {
      const mensaje = "Archivo actualizado correctamente";

      await fs.writeFile(path.join(__dirname, "info.txt"), mensaje, "utf8");

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end(mensaje);
    } else if (req.url === "/mensaje" && req.method === "DELETE") {
      await fs.unlink(path.join(__dirname, "message.txt"));

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("El archivo message.txt fue eliminado correctamente.");
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Ruta no encontrada");
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Error: El archivo solicitado no existe o ya fue eliminado.");
    } else {
      console.error(err);
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Error interno del servidor");
    }
  }
});

server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
