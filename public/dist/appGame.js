(()=>{"use strict";!function(e,n){var l=64/7;l=l.toFixed(2)}();var e,n=2,l=document.getElementById("playBtn"),o=document.getElementById("cantidadP");l.addEventListener("click",(()=>{0==n?(l.style.backgroundColor="",l.innerHTML="Jugar",n=1):1==n?(l.style.backgroundColor="orange",l.innerHTML="Pausa",n=0):(l.style.backgroundColor="orange",l.innerHTML="Pausa",n=0,e=1e3*o.value,v())}));var t=document.getElementById("textView"),r=t.innerHTML.split(" "),a="",i=0,s=0,c=0,g=0;function v(n){var l=setInterval((()=>{for(;c<r.length-1;){if(!((i+=r[c].length)<51)){i=0;break}a=a+r[c]+" ",c++}var n=a.split(" ");t.innerHTML=n.join(" ");var o=0,d=setInterval((()=>{n[o]=n[o].replace(n[o],`<span class="wordSelect">${n[o]}</span>`),t.innerHTML=n.join(" "),o>=n.length-2?(clearInterval(d),console.log("Se detuvo wordInterval")):console.log("Sigue wordInterval"),console.log("valor u: "+o),o++}),e);g=n.length*e+250,console.log("el tiempo es: "+g),(s=s+a.split(" ").length-1)>=r.length-1?(clearInterval(l),console.log("Se termino el lineInterval")):(console.log("sigue lineInterval"),clearInterval(l),console.log(s,r.length-1),v()),a=""}),g)}})();