
const fs = require("fs");
const rutaArchivo = "/home/digitalhouse/Escritorio/practicas/dh-pizzas/"  + "pedidos.json";


let pedidos = fs.readFileSync(rutaArchivo, {encoding: 'utf8'});

pedidos = JSON.parse(pedidos);

console.log(pedidos);