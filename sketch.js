var imgs = [];
var avgImg;
var numOfImages = 30;

//Add a load counter
var loadCounter;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    //load images in
    for(var i = 0; i < numOfImages; i++){
        var img = loadImage("assets/"+i+".jpg",imageloadSuccess);
        imgs.push(img);
    }
}
//////////////////////////////////////////////////////////
function setup() {
    createCanvas(500, 500);
    pixelDensity(1);
}
//////////////////////////////////////////////////////////
function draw() {
    background(125);

}
