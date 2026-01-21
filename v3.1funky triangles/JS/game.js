const canvas = document.getElementById("my-canvas");// getting the canvas

canvas.height = window.innerHeight - ((window.innerHeight / 100)*4 );// setting it to full screen with minus 4% so the screen dosnt overflow
canvas.width = window.innerWidth - ((window.innerWidth / 100)*4 );

const ctx = canvas.getContext("2d"); // gettin canvas context

//Variables
let drawing = false;
let shape = "none";
let prevY, prevX, snapshot;
let keydown = false;
let risingEdge = false;
ctx.lineWidht = 10;

//Eventlisteners
canvas.addEventListener("mousedown", (e) => {
  initDraw(e);
})
canvas.addEventListener("mousemove", (e) => {
  draw(e);
  
})

canvas.addEventListener("mouseup", (e) => {
  drawing = false;
})

window.addEventListener("keydown", (e) =>{
    drawing = false;
    if(e.code == "KeyT"){
       
        shape = "tri";
    }
    else if(e.code == "KeyC")
    {
        shape = "cir";
    }
    else if(e.code == "KeyR"){
       shape = "rect";
    }
    if(!keydown &&  !risingEdge){
        keydown = true; 
        risingEdge = true;
    }



})

window.addEventListener("keyup", (e) =>{
    
    if(e.code == "KeyT" || e.code == "KeyC" || e.code == "KeyR"){
       shape = "false";
    }
    keydown = false;
    risingEdge = false;

})
// functions
function setPrev(e){
    prevX = e.offsetX; 
    prevY = e.offsetY;
}

function initDraw(e) {
  setPrev(e);
  drawing = true;
}
function saveCan(){
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}


function draw(e) {
    if (drawing) {
      ctx.beginPath(); 
      ctx.moveTo(prevX, prevY)
      ctx.lineTo(e.offsetX,e.offsetY);
      ctx.stroke();
      ctx.closePath();
      setPrev(e);
    }
    else if( shape == "rect"){
        if(risingEdge){
            setPrev(e);
            saveCan();
            risingEdge = false;
        }
        ctx.putImageData(snapshot, 0, 0);
        ctx.strokeRect(prevX, prevY, e.offsetX - prevX, e.offsetY -prevY);
        
    }
    else if( shape == "tri"){
        ctx.beginPath(); 
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.lineTo(prevX + (2*(e.offsetX - prevX)),prevY);
        ctx.closePath();
        ctx.stroke();
        setPrev(e);
    }
    else if( shape == "circ"){
        ctx.beginPath();
        ctx.arc(40, 80, 800 ,0 , 2 * Math.PI);
        ctx.stroke(); 
    }

}

