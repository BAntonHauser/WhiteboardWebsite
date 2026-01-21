const canvas = document.getElementById("my-canvas");

canvas.height = window.innerHeight - ((window.innerHeight / 100)*4 );
canvas.width = window.innerWidth - ((window.innerWidth / 100)*4 );;

const ctx = canvas.getContext("2d");


let drawing = false;
let shape = "none";
let prevY, prevX; 


canvas.addEventListener("mousedown", (e) => {
  init(e);
})
canvas.addEventListener("mousemove", (e) => {
  draw(e);
})

canvas.addEventListener("mouseup", (e) => {
  drawing = false;
})

window.addEventListener("keydown", (e) =>{
    
    if(e.code == "KeyT"){
       
        shape = "tri"
    }
    else if(e.code == "KeyC")
    {
        shape = "cir";
    }
    else if(e.code == "KeyR"){
       shape = "rect";
    }


})

window.addEventListener("keyup", (e) =>{
    
    if(e.code == "KeyT" || e.code == "KeyC" || e.code == "KeyR"){
       shape = "false";
    }


})

function setPrev(e){
    prevX = e.offsetX; 
    prevY = e.offsetY;
}

function init(e) {
  setPrev(e);
  drawing = true;
}


function draw(e) {
    
    if (drawing) {
      ctx.beginPath(); 
      ctx.moveTo(prevX, prevY)
      ctx.lineTo(e.offsetX,e.offsetY);
      ctx.stroke();
      ctx.closePath()
      setPrev(e);
    }
    else if( shape == "rect"){
        
        ctx.strokeRect(prevX, prevY, e.offsetX - prevX, e.offsetY -prevY);
    }

}
/**
 * 
 * setPrev();
        ctx.beginPath();
        ctx.arc(40, 80, 800 ,0 , 2 * Math.PI);
        ctx.stroke(); */