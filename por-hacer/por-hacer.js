const fs = require('fs');
// const colors = require('colors');

let listadoPorHacer = [];

const cargarDB = () =>{
    try {
        listadoPorHacer = require('../db/data.json');        
    } catch (error) {
        listadoPorHacer = [];
    }
    
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./db/data.json',data, (err) => {
        if(err){
            throw new Error('No se pudo grabar',err);
        }
    });
}

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if(index >= 0){
        listadoPorHacer[index].completado = completado;
    }else{
        return false;
    }

    guardarDB();

    return true;
}

const borrar = (descripcion) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if(index >= 0){
        listadoPorHacer.splice(index,1);
    }else{
        return false;
    }

    //otra forma de hacer la eliminacion
    // let nuevoListado = listadoPorHacer.filter( tarea => {
    //     return tarea.descripcion != descripcion;
    // })

    // if(listadoPorHacer.length === nuevoListado.length){
    //     return false;
    // }else{
    //     listadoPorHacer = nuevoListado;
    //     guardarDB();
    //     return true;
    // }

    guardarDB();
    return true;
}
module.exports ={
    crear, getListado, actualizar, borrar
}