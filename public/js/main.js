//Importaciones
//import {makeReq} from './Modulos/request';

//Escript de la primera pagina
var txt = document.getElementById('txt');
var numbWord = document.getElementById('numbWord');
    //Script para contar palabra y controlar el boton de play
    txt.value = '';
var spaces = 0;
var text;
var playBtn = document.getElementById('play');
var countWords = document.getElementById('numbWords');
txt.addEventListener('keyup', ()=>{
    var spaces = txt.value.split(' ').length-1;
    numbWords.value = spaces;
    numbWord.innerHTML = `<strong>Número de palabras: ${spaces}</strong>`;
    if(spaces < 60){
        numbWord.style.color = 'red';
        playBtn.disabled = true;
    }
    else{
        numbWord.style.color = 'green';
        playBtn.disabled = false;
    }
});
txt.addEventListener('focusin', ()=>{
    var spaces = txt.value.split(' ').length-1;
    numbWords.value = spaces;
    numbWord.innerHTML = `<strong>Número de palabras: ${spaces}</strong>`;
    if(spaces < 60){
        numbWord.style.color = 'red';
        playBtn.disabled = true;
    }
    else{
        numbWord.style.color = 'green';
        playBtn.disabled = false;
    }
});
txt.addEventListener('focusout', ()=>{
    var spaces = txt.value.split(' ').length-1;
    numbWords.value = spaces;
    numbWord.innerHTML = `<strong>Número de palabras: ${spaces}</strong>`;
    if(spaces < 60){
        numbWord.style.color = 'red';
        playBtn.disabled = true;
    }
    else{
        numbWord.style.color = 'green';
        playBtn.disabled = false;
    }
});

//Funciones y estilos para el boton de cargar pdf
var playBtn2 = document.getElementById('play2');
playBtn.disabled = true;
playBtn2.disabled = true;
var copyText = document.getElementById('copyText');
var pdfText = document.getElementById('pdfText');
var pdfLabel = document.getElementById('pdfLabel');
var pdfUp = document.getElementById('pdf');

pdfUp.addEventListener('change',()=>{
    pdfLabel.innerHTML = pdfUp.value.substr(12);
    if(pdfUp.value == ''){
        playBtn2.disabled = true;
    }else{
        playBtn2.disabled = false;
    }
});
pdfText.addEventListener('click',()=>{
    pdfUp.value = '';
    numbWord.innerHTML = '';
    playBtn2.disabled = true;
   
}); 
copyText.addEventListener('click',()=>{
    pdfUp.value = '';
    numbWord.innerHTML = '';
    pdfLabel.innerHTML = 'Carga tu archivo'
    playBtn2.disabled = true;
});
//Eventos para el menu de preferencias del doc y el envio y respuesta de este
var docConfig = document.getElementById('pdfConfigCnt'),
    desde = document.getElementById('desde'),
    hasta = document.getElementById('hasta'),
    theText = document.getElementById('theText'),
    playBtn3 = document.getElementById('play3'),
    otherFile = document.getElementById('otherFile'),
    uploadFile = document.getElementById('upload'),
    title = document.getElementById('title'),
    author = document.getElementById('author'),
    loadCnt = document.getElementById('loadCnt'),
    imgLoad = document.getElementById('imgLoad'),
    desLoad = document.getElementById('desLoad'),
    pages = document.getElementById('pages'),
    hiddenName = document.getElementById('hiddenName'),
    totalPalabras = document.getElementById('totalPalabras'),
    countWords = document.getElementById('countWords');

playBtn2.addEventListener('click',()=>{
    //Desplegando el menu
    docConfig.style.visibility = 'visible';
    imgLoad.style.animationIterationCount = 'infinite';
    desLoad.style.animationIterationCount = 'infinite';
    //Enviando el archivo que se cargara en el menu
    var datos = new FormData(uploadFile);
    fetch('http://localhost:3000/pdf',{
        method: 'POST',
        body: datos
    }).then(function(res){
        return res.json();
    }).then(function(myRes){
        //Mostrando al ususario
        loadCnt.style.visibility = 'hidden';
        imgLoad.style.animationIterationCount = '';
        desLoad.style.animationIterationCount = '';
        //console.log(myRes);
        var text = myRes.text;
        title.innerHTML = 'Titulo: ' + myRes.name;
        author.innerHTML = 'Autor: ' + myRes.author;
        pages.innerHTML = 'Total de páginas: ' + myRes.pages;
        theText.innerHTML = text;
        hiddenName.value = myRes.path;
        var totalWord = `Total palabras: ${text.trim().split(' ').length +1}`;
        totalPalabras.innerHTML = totalWord;
        countWords.value = totalWord;
    })
    
});

//Eslos y eventos del menu de preferencias del documento
otherFile.addEventListener('click',()=>{
    var name = hiddenName.value;
    fetch(`http://localhost:3000/${name}`, {
        method: 'delete'
    }).then((v)=>{
        docConfig.style.visibility = '';
    loadCnt.style.visibility = '';
    imgLoad.style.animationIterationCount = 'infinite';
    desLoad.style.animationIterationCount = 'infinite';
    })
});

var setPages = document.getElementById('setPages');
var desdeLabel = document.getElementById('desdeLabel');
var hastaLabel = document.getElementById('hastaLabel');
var setBtn = document.getElementById('setBtn');
desde.disabled =  true;
hasta.disabled =  true;
hastaLabel.style.opacity = '';
desdeLabel.style.opacity = '';
setBtn.disabled = true;
setPages.checked = false;
setPages.addEventListener('change',()=>{
    if(setPages.checked == true){
        desde.disabled = false;
        hasta.disabled = false;
        hastaLabel.style.opacity = '1';
        desdeLabel.style.opacity = '1';
        setBtn.disabled = false;
    }else{
        desde.disabled =  true;
        hasta.disabled =  true;
        hastaLabel.style.opacity = '';
        desdeLabel.style.opacity = '';
        setBtn.disabled = true;
    }
});
//Eventos del formulario de preferencias
hasta.value = 2;
desde.value = 1;
var preferencias = document.getElementById('preferencias');
hasta.addEventListener('change',()=>{
    if(hasta.value <= parseInt(pages.innerHTML.substr(pages.innerHTML.length-1))){
        hasta.style.borderColor = '';
    }else if(hasta.value > parseInt(pages.innerHTML.substr(pages.innerHTML.length-1))){
        hasta.style.borderColor = 'red';
    }

    if(hasta.value > parseInt(pages.innerHTML.substr(pages.innerHTML.length-1)) || desde.value > hasta.value-1){
        setBtn.disabled = true;
    }else{
        setBtn.disabled = false;
    }
});
desde.addEventListener('change',()=>{
    if(desde.value <= hasta.value){
        desde.style.borderColor = '';
    }else if(desde.value > hasta.value -2){
        desde.style.borderColor = 'red';
    }

    if(hasta.value > parseInt(pages.innerHTML.substr(pages.innerHTML.length-1)) || desde.value > hasta.value-1){
        setBtn.disabled = true;
    }else{
        setBtn.disabled = false;
    }
});
setBtn.addEventListener('click', ()=>{
    loadCnt.style.visibility = '';
    imgLoad.style.animationIterationCount = 'infinite';
    desLoad.style.animationIterationCount = 'infinite';
    loadCnt.style.opacity = '0.7';
    var pages = {
        hasta: hasta.value,
        desde: desde.value,
        path: hiddenName.value
    }
    fetch(`http://localhost:3000/pages/${pages.desde}/${pages.hasta}/${pages.path}`, {
        method: 'post',
    }).then((v)=>{
        return v.json()
    }).then((res)=>{
        loadCnt.style.visibility = 'hidden';
        imgLoad.style.animationIterationCount = '';
        desLoad.style.animationIterationCount = '';
        loadCnt.style.opacity = '';
        var text = res.text;
        theText.innerHTML = text;
        var totalWord = `Total palabras: ${text.trim().split(' ').length +1}`;
        totalPalabras.innerHTML = totalWord;
        countWords.value = totalWord;
    })
})




  









