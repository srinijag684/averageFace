var imgs = [];
var avgImg;
var numOfImages = 30;

//Add a load counter
var loadCounter = 0;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    //load images in
    for(var i = 0; i < numOfImages; i++){
        var img = loadImage("assets/"+i+".jpg", imageloadSuccess);
        imgs.push(img);
    }
    img2 = loadImage("assets/0.jpg")
}
  

//add in a imageloadSuccess call back function this function is call back 
//by loadImage() in preload() when an image is successfully loaded
function imageloadSuccess(){
    loadCounter++;
}
//////////////////////////////////////////////////////////
function setup() {
    createCanvas(1012, 512);
    pixelDensity(1);
}
//////////////////////////////////////////////////////////
function draw() {
    background(125);
    //check if all images are loaded into memory
    
    if(loadCounter != numOfImages){
        console.log("not ready");
        return;
    }
    //calling average face function
    var img = averageFace(imgs);
    image(img,500,0);
    image(img2,0,0);
    console.log("All images loaded, ready for average face");
    noLoop();

}

function mouseClicked(){
    image(random(imgs),0,0);
}

//Average face algo
function averageFace(images){
    //load all the image pixels fro processing
    console.log("in Average Face");
    for(var i = 0; i <images.length;i++){
        images[i].loadPixels();
    }

    //create an img obj that is used to store the final image 
    var imgOut = createImage(images[0].width,
        images[0].height);
    
    imgOut.loadPixels();

    //loop through all the pixels in imgOut obj
    for(var y = 0; y <imgOut.height; y++){
        for(var x = 0; x < imgOut.width; x++){
            //calculate the pixel index for imgOut
            var pixelIndex = ((imgOut.width * y)+ x)* 4;
            //initialise variable to store the sum of each RGB Value.
            var redSum = 0;
            var greenSum = 0;
            var blueSum = 0;

            //get each corresponding pixel value in the image
            for(var i = 0; i < images.length; i++){
                var img = images[i];
                redSum += img.pixels[pixelIndex + 0];
                greenSum += img.pixels[pixelIndex + 1];
                blueSum += img.pixels[pixelIndex + 2];
            }

            //set the avg value for each RGB in each pixel in imgOut obj
            //in the coresponding pixel
            imgOut.pixels[pixelIndex+ 0] = redSum/images.length;
            imgOut.pixels[pixelIndex+ 1] = greenSum/images.length;
            imgOut.pixels[pixelIndex+ 2] = blueSum/images.length;
            imgOut.pixels[pixelIndex+ 3] = 255;
        }
    }

    imgOut.updatePixels();
    return imgOut;
}