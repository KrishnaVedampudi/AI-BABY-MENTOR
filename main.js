status = "";
objects = [];
var Alert;
function preload()
{
    Alert = loadSound("alert.mp3");
}
function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380)

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    
    canvas.parent("canvas");
    
    
setTimeout(
    function(){
        objectDetector.detect(video, gotResults);
    },5000);
    
}
function gotResults(error, results)
{   
    if(error)
    {
        console.log(error);
    }else
    {        
       status = true;                 
    }
   
    objects = results;   
    console.log(objects);
    
}

function draw()
{
    image(video, 0, 0, 380, 380);     
            if(status != "")
            {
            if(objects != null)
              for(i=0; i <= objects.length; i++)
               {        
                
                r = random(255);
                g = random(255);
                b = random(255);
                textSize(18);                                 
                fill(r, g, b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y+15);
                noFill();
                stroke(r, g, b);   
                if(objects[i].label = "person")
                {
                    document.getElementById("status").innerHTML = "Baby Found"; 
                    Alert.stop();
                }else
                {
                    document.getElementById("status").innerHTML = "Baby Not Found";
                    Alert.play(); 
                }

                           
            }
            }             
}

