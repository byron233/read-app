//Este codigo se encargara de verificar el tiempo total y establecer un contador

export function setTotalTime(ppm, totalP){
    //Esta funcion calculara el tiempo total que se tardara en leer todo el texto
    var time = (totalP * 1) / ppm;
    time = time.toFixed(2);
    
    return time;
}