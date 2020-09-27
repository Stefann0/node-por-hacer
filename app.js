const argv = require('./config/yargs.js').argv;
const porHacer = require('./por-hacer/por-hacer');
const color = require('colors');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        for(let tarea of listado){
            console.log('===== Por Hacer ====='.green);
            console.log(tarea.descripcion);
            console.log('Estado:',tarea.completado);
            console.log('====================='.green);
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        if(actualizado){
            console.log('registro actualizado!'.green);
        }else{
            console.log('registro no se encontro!'.red);
        }

        break;
    case 'borrar':
        let borrar = porHacer.borrar(argv.descripcion);
        if(actualizado){
            console.log('registro eliminado!'.green);
        }else{
            console.log('registro no se encontro!'.red);
        }
        break;
    default:
        console.log('comando no reconocido');
        break;
}

// console.log(argv);