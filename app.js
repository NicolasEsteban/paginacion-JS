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
function startParameters() {
    for (let i = 0; i < 20; i++) {
        data.push({ id: i + 1, name: 'usuario ' + (i + 1) });

    }

};

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

function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
};

function nextPage() {
    pageNumber++;
    showData(pagination);
};

function previusPage() {
    pageNumber--;
    showData(pagination);
};

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


function showData(_data) {
    var pagination = paginate(data, pageSize, pageNumber);
    //console.log("nextPage", pagination);
    var numberButtons = calculateButtons(ranks);
    console.log('numero botones: '+numberButtons);
    writeBodyTable(pagination);
    html = `<div class="btn-group me-2" role="group" aria-label="First group"></div>`;
    html += pageNumber >1  ? `<button type="button" id="previus" class="btn btn-outline-primary" onclick='previusPage()' >Anterior</button> `: `<button type="button" id="previus" class="btn btn-outline-primary"  disabled >Anterior</button> `;
    html += pageNumber < pageCont ? `<button type="button" id="next" class="btn btn-outline-primary" onclick='nextPage()' >Siguiente</button>  `:`<button type="button" id="next" class="btn btn-outline-primary"  disabled>Siguiente</button>  `  ;
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
// Elemento utilizado 
ranks.push(pageNumber,pageNumber+2);
html = "";

pageCont = Math.ceil(data.length / pageSize);



showData();
