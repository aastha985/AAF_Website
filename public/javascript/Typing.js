var i = 0;
var txt = 'Believe you can and you are halfway there!';
var speed = 50;
      
window.onload = typeWriter();
function typeWriter() {
if (i < txt.length) {
    document.getElementById("tag").innerHTML += txt.charAt(i);
    document.getElementById("tag").style.zIndex =1;
    document.getElementById("tag").style.position = "relative";
    i++;
    setTimeout(typeWriter, speed);
    }
}