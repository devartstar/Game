
var b=document.getElementById("button");
var cord=document.getElementById("cord");
b.addEventListener("touchmove",function(evt){
    var touch=evt.touches[0];   //0 for 1 finger
    var height=this.clientHeight/2;
    var width=this.clientWidth/2;
    var x=touch.clientX-width;
    var y=touch.clientY-height;
    cord.innerHTML=x+"/"+y

    
    this.style.transform = "translate("+x+"px,"+y+"px)";

});

