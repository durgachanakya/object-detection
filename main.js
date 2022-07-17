img = "";
status = "";
object = [];

function preload(){
    img = loadImage("Guitar.png");
}

function setup(){
    canvas = createCanvas(500,500);
    canvas.center();

    object_detector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "status : object detecting";
}

function modelLoaded(){
    console.log("model loaded");
    status = true;
    object_detector.detect(img , gotResult);
    
}

function draw(){
    image(img,0,0,500,500);
    
    if(status != ""){

        for(i = 0;i < object.length; i++){
            document.getElementById("status").innerHTML = "status : object detecting";
            fill("blue");
            percent = floor(object[i].confidence *100);
            text(object[i].label + " " + percent + "%", object[i].x,object[i].y);
            noFill();
            stroke("green");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}

function gotResult(error , results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object = results;
}