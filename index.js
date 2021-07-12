//ya para este punto ya inicializamos el proyecto con npm init --yes
const express = require('express');//requerimos express js y luego la invocamos.
const app = express();//express es aquella libreria que nos permite levantar el servidor facilmente.
const port = 3000;//creamos una constante con el nombre port y el valor 3000.
//ahora instalamos helmet en la terminal con npm install --save helmet
const helmet = require('helmet');//luego requerimos la libreria helmet y no vamos a invocarla todavia.
//ahora instalamos en la terminal otra libreria llamada express-rate-limit, que lo que hace es acotar
//la contidad de peticiones. npm install --save express-rate-limit
const rateLimit = require('express-rate-limit');//aqui ya la requerimos
//¿como usar la libreria helmet?
//pero primero te digo que es, es una libreria que te permite habilitar o desabilitar ciertas cabeceras
//creamos un app.use
app.use(helmet());//a partir desde este momento ya invocamos la constante helmet que definimos

app.disable('x-power-by');//con esto creamos un nuevo middleware para desactivar la cabecera con el metodo
//disable() para que los atacantes no puedan utilizarla, esta cabecara por defecto esta ativada.
//¿como podemos hacer para limitar la contidad de informacion?
app.use(express.json({limit: '100'}));//El tamaño de informacion que le estamos limitando mejora la seguridad + la cantidad de petic.

let limiter = rateLimit({//aqui acabamos de invocar la constante rateLimit
    windowMs : 60 * 60 * 1000, //60 minutos
    max: 2,//limite de peticiones por hora 
    message: "superaste la cantidad limite de peticion por hora, osea 2"//mensaje
});

app.use(limiter);//app.use para hacer uso de limiter

app.get('/api/action', function(req, res) {//creando un endpoint
    res.status(200).send('ok');
});

app.listen(port,() =>{//esta linea dice que el puerto escuchara en el 3000
    console.log('El servidor esta escuchando en el puerto '+port)
});

//hasta aqui ya podemos hacer una paticion con el verbo get de HTTP que nos devolvera un mensaje ok, y
// despues de la dos peticiones nos devolvera un mensaje del de la variable limiter que supere el limite
//de peticiones.




