//En este apartado se ejecutara la logica del area de juegos
import {setTotalTime} from './Modulos/timing';
var p = setTotalTime(7, 64);
var status = 2;
var playBtn = document.getElementById('playBtn');
var time;
var cantidadP = document.getElementById('cantidadP');
playBtn.addEventListener('click', ()=>{
    if(status == 0){
        //Esta en pause
        playBtn.style.backgroundColor = '';
        playBtn.innerHTML = 'Jugar';
        status = 1;
    }else if(status == 1){
        //Esta en play
        playBtn.style.backgroundColor = 'orange';
        playBtn.innerHTML = 'Pausa';
        status = 0;
    }else{
        //No ha comenzado
        playBtn.style.backgroundColor = 'orange';
        playBtn.innerHTML = 'Pausa';
        status = 0;
        time = cantidadP.value * 1000;
        line('n');
    }
})
// alert(p);
 //line();




//La siguiente funcion permitira mostrar las palabras en diferente tiempo
var textView = document.getElementById('textView');
var palabras = textView.innerHTML.split(' ');
var textShow = '';
var countCharecter = 0;
var countWord = 0;
var i = 0;
var relativeTime = 0;
function line(destroy){
    //Calculando la cantidad de palabras para cada linea
    var lineInterval = setInterval(()=>{
        while(i < palabras.length-1){
            countCharecter = countCharecter + palabras[i].length;
            if(countCharecter < 51){
                textShow = textShow + palabras[i] + ' ';
            }else{
                countCharecter = 0;
                break;
            }
            i++;
        }
        

        //Dandole estilos a palabra por palabra
        var countPalabras = 0;
        var words = textShow.split(' ');
        textView.innerHTML = words.join(' ');
        var u = 0;
        var wordInterval = setInterval(()=>{
            words[u] = words[u].replace(words[u], `<span class="wordSelect">${words[u]}</span>`);
            textView.innerHTML = words.join(' ');

            //Controlando wordInterval
            if(u >= words.length-2){
                clearInterval(wordInterval);
                console.log('Se detuvo wordInterval');
            }else{
                console.log('Sigue wordInterval');
            }
            console.log('valor u: '+ u);
            u++;
        },time);
        //Calculando el tiempo de lineInterval
        relativeTime = (words.length * time) + 250;
        console.log('el tiempo es: '+ relativeTime);

        //Control del line interval
        countWord = countWord + textShow.split(' ').length-1;
        if(countWord >= palabras.length-1){
            clearInterval(lineInterval);
            console.log('Se termino el lineInterval');
            

        }else{
            console.log('sigue lineInterval');
            clearInterval(lineInterval);
            console.log(countWord, palabras.length-1);
            line();
        }

        //Reiniciando algunas variables
        textShow = '';
    }, relativeTime)

    //Deteniendo todo
    function destroyAll(){
        clearInterval(lineInterval);
        clearInterval(wordInterval);
    }
}