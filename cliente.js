

const inquirer = require('inquirer');
const fs = require("fs");
const rutaArchivo = "/home/digitalhouse/Escritorio/practicas/dh-pizzas/"  + "pedidos.json";

let pedidos = fs.readFileSync(rutaArchivo, {encoding: 'utf8'});

pedidos = JSON.parse(pedidos);


let opciones = [
       
       {
         name: 'para_llevar',
         type: 'confirm',
         message: '¿La pizza es para llevar?',
         default: false
       },
    
        {
        name: 'direccion',
        type: 'input',
        message: 'ingresa tu direccion',
        when: function (respuestas) {
            return respuestas.para_llevar
        },
        validate: function(respuesta) {

            if (respuesta.length <5){
                    return 'Dejanos saber tu direccion para enviarte la pizza' 

            }
            return true
        }    
    
        },
    
       

        {
            name: 'cliente_habitual',
            type: 'confirm',
            default: false
        },

       {
           name: 'nombre',
           type: 'input',
           message:'Ingresa tu nombre',
       },
       {
           name: 'telefono',
            type: 'input',
            message: 'Ingresa tu numero de telefono',
        },
       {
            name: 'gusto', 
            type: 'rawlist',
             message:'Elegi el gusto de tu pizza',
             choices: ['Muzzarella', 'Jamon y Morron', 'Calabresa', '4 quesos'],
        
        },

        {
             name: 'tamanio',
             type: 'list',
             message: 'Elegi el tamaño de la pizza',
             choices: ['Personal', 'Mediana', 'Grande'], 
        },

        {
            name: 'con_bebida',
            type: 'confirm',
            default: false
            },
    



        {
            name: 'bebida',
            type: 'list',
            message: 'Elegi el gusto de bebida',
            choices: ['naranja', 'pomelo', 'manzana', 'limon'],
            when: function (respuesta) {
                return respuesta.con_bebida
            } 
        
        },
        
        {
            name: 'empanadas',
            type: 'checkbox',
            message: '¿Que gusto de empanada queres?',
            choices: [
                {
                   name: 'Jamon y queso',
                },
                {
                    name: 'carne',
                 },

                 {
                    name: 'carne',
                 },

                 {
                    name: 'Pollo',
                 },


                 {
                    name: 'Atun',
                 },

                 {
                    name: 'Queso',
                 },
            ]
        },
]

inquirer
        .prompt(opciones)
        .then(respuestas =>{
            test = "=== Resumen de tu pedido ===\n";
            imprimir = "Tus datos son - Nombre: " + respuestas.nombre + " / Telefono: " + respuestas.telefono + "\n"; 
            
            if(respuestas.para_llevar == true) {
                dr =  respuestas.direccion;
                penvio = 20;
                }else {
                    dr = "Nos indicaste que pasaras a buscar tu pedido";
                    penvio = 0;
                }
            
            console.log(test,imprimir,dr);
            console.log("=== Productos Solicitados ===");
            console.log("Pizza: "+ respuestas.gusto);
            console.log("Tamaño: " + respuestas.tamanio);
            
            if(respuestas.con_bebida == true){
            pbebida = 80; 
            
            console.log("Bebida: " + respuestas.bebida); 
               }else{
                   pbebida = 0;
               }
               
            if(respuestas.cliente_habitual== true){
                 console.log("   *Gusto empanada 1 " + respuestas.empanadas[0]); 
                 console.log("   *Gusto empanada 2 " + respuestas.empanadas[1]);
                 console.log("   *Gusto empanada 3 " + respuestas.empanadas[2]);
                }
            console.log("======================================");
            
             descuento = 0;
             switch(respuestas.tamanio) {
                 case 'Personal':
                       precioP = 430; 
                       if (respuestas.con_bebida){
                       descuento = 3;

                       }

                       break;
                 case 'Mediana':
                       precioP = 560;
                       if (respuestas.con_bebida){
                        descuento = 5;
 
                        }
 
                
                       break;
                  case 'Grande':
                       precioP = 650;
                       if (respuestas.con_bebida){
                        descuento = 8;
 
                        }
 
                       break;

                }
            
            
           console.log("Total productos: $" + (precioP + pbebida) );
            
           if(respuestas.para_llevar == true) {
            console.log("Total Delivery: $" + penvio) ;
           }

           ptotal = penvio+ precioP + pbebida;
           let descuentot = 0;

         if(descuento>0){
            descuentot = ((ptotal * descuento)/ 100);
         //   console.log("Descuento: $" + ((ptotal * descuento)/ 100));
              console.log("Descuento: $" + descuentot);
        }
         

        console.log("Total: $" + (ptotal- ((ptotal * descuento)/ 100))) ;
        console.log("======================================");


        let fecha = new Date();

        fecha = "Fecha: " + fecha.getFullYear() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getDate();
         
        console.log(fecha); 
         
       
         
          let hora = new Date();
              let am2 = "AM";
              let am = hora.getHours();
             if (am >12){
                am = am - 12;
                am2 = "PM";
               }
           
            
               hora = "Hora: " + am + ":" + hora.getMinutes() + ":" + hora.getSeconds() + " " + am2;
               console.log(hora);
        

             let nuevos =  {
                  fecha: fecha,
                   hora : hora,
                   totalProductos: ptotal,
                   descuentos: descuentot, 
                   id: pedidos.length == 0 ? 1 : pedidos.length ++

             }

             let final = {

                   ...respuestas,
                   ...nuevos
             }
            
           pedidos.push(final)

           pedidos = JSON.stringify(pedidos);
          
            fs.writeFileSync(rutaArchivo, pedidos)
            
               
        
        
        
        
        
        
            })

