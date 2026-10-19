import express from 'express';
import fs from "fs";
//El puto Middleword
import bodyParser from "body-parser";


const app = express();
const PORT = 3000;
// Aquí uso el middleword
app.use(bodyParser.json());


// Creo una función para leer del archivo db.json
const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return(JSON.parse(data));
    }catch(error){
        console.log("ERROR: " + error);
    };
};

// Creo una función para escribir en el archivo db.json
const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    }catch(error){
        console.log("ERROR: " + error);
    };
};

// Este fue el primer endpoint
app.get('/', (req, res) => {
    res.send("Telas tabas comiendo mijito"); 
});

// De esta manera leo los datos y los puedo mostrar en el navegador
app.get("/pueblos", (req, res) => {
    const data = readData();
    res.json(data.pueblos);
}); 


// Este endpoint me muestra sólo el pueblo con el "id = X" (pa eso es el puto "id:")
app.get("/pueblos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const pueblo = data.pueblos.find((pueblo) => pueblo.id === id);
    res.json(pueblo);
});

// Este endpoint me permite agregar un nuevo pueblo a la lista
// ACHTUNG: Hay que ver porqué jueputa no me reconoció el ...pueblo
app.post("/pueblos", (req, res) => {
    const data = readData();
    const body = {
        id: data.pueblos.length + 1,
        "nombre": "Hoorn",
        "ruta": "Rhin-Waal",
        "embarque": "False" 
    };
    data.pueblos.push(newPueblo);
    writeData(data);
    res.json(newPueblo);
});

// Este endpoint es para modificar, ojito de no usar el spread (...algo) porque no me funciona
//                                          Pues el hijueputa funcionó aquí
app.put("/pueblos/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const idPueblo = data.pueblos.findIndex((pueblo) => pueblo.id === id);
    data.pueblos[idPueblo] = {
        ...data.pueblos[idPueblo],
        ...body,
    };
    writeData(data);
    res.json({message: "Se actualizó correctamente."})
    res.json(data.pueblos[idPueblo]);
});

// Ya me había quitado los interiores, pero faltó el DELETE
app.put("/pueblos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const idPueblo = data.pueblos.findIndex((pueblo) => pueblo.id === id);
    data.pueblos.splice(idPueblo,1)
    writeData(data);
    res.json({message: "Se eliminó ese pueblo correctamente."})
};

// Esto me permite usar (escuchar) el puerto con el navegador
app.listen(PORT, () =>{
    console.log(`Servidor levantado en el puerto ${PORT}`)
});