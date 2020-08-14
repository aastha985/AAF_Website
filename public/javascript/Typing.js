let i = 0;
let txt = 'Believe you can and you are halfway there!';
let speed = 50;
      
window.onload = typeWriter();
const typeWriter = () => {
    if (i < txt.length) {   
        document.getElementById("tag").innerHTML += txt.charAt(i);
        document.getElementById("tag").style.zIndex =1;
        document.getElementById("tag").style.position = "relative";
        i++;
        setTimeout(typeWriter, speed);
    }
}