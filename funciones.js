// FUNCIONES MAYORES
const arrayOriginal = [1, 2, 3, 4, 5, 6]; 

// MAP
// -> Hacer algún tipo de operación sobre todos los elementos del array original
// -- devolvera otro array con el mismo numero de elementos del original
// arrayInicial.map(item_que_devuelve => accion)
const arrayMap = arrayOriginal.map(numero => numero * 2);
console.log(arrayMap);

// FILTER
// -> Filtra según una condición
// -- devuelve otro array con los elementos filtrados
// arrayInicial.filter(item_que_devuelve => condición)
const arrayFilter = arrayOriginal.filter(numero => numero % 2 == 0);
console.log(arrayFilter);

// REDUCE
