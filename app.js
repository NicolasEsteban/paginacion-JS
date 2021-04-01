'use strict'

// Variables
var data = [];
var pageNumber;
var pageSize;
var html = "";
var pagination;
var pageCont;
var ranks = [];

// Funciones
// Se inicia el contenido de prueba
function startParameters() {
    for (let i = 0; i < 50; i++) {
        data.push({ id: i + 1, name: 'usuario ' + (i + 1) });

    }

};
// Se escriben elementos en la tabla de datos
function writeBodyTable(data) {
    var html = ``;
    data.forEach(cont => {
        html += `
            <tr>
                <td>${cont.id}</td>
                <td>${cont.name}</td>
            </tr>
            `
    });
    document.getElementById('bodyTable').innerHTML = html;
}
// Se selecciona la cantidad de elementos que se mostra por pagina
function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
};
// Funcion utilizada para la pagina siguiente
function nextPage() {
    pageNumber++;
    showData(pagination);
};
// Funcion utilizada para ir a la pagina anterior
function previusPage() {
    pageNumber--;
    showData(pagination);
};
// Funcion para seleccionar la pagina que indica cada uno de los botones
function selectPage(number){
    //console.log('numero de pagina: '+number);
    pageNumber = parseInt(number);
    showData(pagination);
}
// Define numero de los botones entre el boton 'anterior' y 'siguiente'
function calculateButtons(ranks){
    var numbers = [];
    if(pageNumber<ranks[0]){
        ranks[0]= pageNumber;
        ranks[1]= pageNumber + 2;
    }
    if(pageNumber>ranks[1]){
        ranks[1] = pageNumber;
        ranks[0] = pageNumber - 2;
    }

    console.log(pageNumber);
    console.log('rangos: '+ranks);
    for(let i = ranks[0]; i<=ranks[1];i++){

        numbers.push(i);
    }
    return numbers;
};

// Funcion para hacer variable la cantidad de elementos por vista
function selectPageSize(){
    pageSize = parseInt(document.querySelector('#select-page-size').value);
    pageCont = Math.ceil(data.length / pageSize);
    pageNumber = 1;
    console.log(pageCont);
    showData(pagination);
    
}

// Funcion principal que realiza la paginacion y se escriben los botones en la vista
function showData(_data) {
    var pagination = paginate(data, pageSize, pageNumber);
    //cantidad de pagina es mayor a 3
    
    
    writeBodyTable(pagination);
    html = `<div class="btn-group me-2" role="group" aria-label="First group"></div>`;
    html += pageNumber >1  ? `<button type="button" id="previus" class="btn btn-outline-primary" onclick='previusPage()' >  &laquo; </button> `: ``;
    //Si la pcantidad de pagina es mayor que 3, se imprimiran los botones del medio
    if (pageCont > 3) { 
        var numberButtons = calculateButtons(ranks);
        console.log('numero botones: '+numberButtons);
        numberButtons.forEach(numberB =>{
            //console.log(numberB);
            if(numberB === pageNumber){
                html += `<button type="button" class="btn btn-primary" onclick="selectPage('${numberB}' );" >${numberB}</button>`;
            }else{
                html += `<button type="button" class="btn btn-outline-primary" onclick="selectPage('${numberB}' );" >${numberB}</button>`;
            }
        });
    }
    html += pageNumber < pageCont ? `<button type="button" id="next" class="btn btn-outline-primary" onclick='nextPage()' > &raquo; </button>  `:``;
    html +=` </div>`;
    document.getElementById("pagination").innerHTML = "";
    document.getElementById("pagination").innerHTML = html;

    


};



//se inician o llaman las funciones.
startParameters();
//console.log(data);
// Pagina de inicio
pageNumber = 1;
// Elementos por pagina
pageSize = 6;
// Elemento utilizados para obtener los botones que estaran al medio 
ranks.push(pageNumber,pageNumber+2);
html = "";
// Cantidad de paginas
pageCont = Math.ceil(data.length / pageSize);



showData();
