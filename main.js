song1 = "";
song2 = "";
song1status = "";
song2status = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

function preload(){
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function modelLoaded(){
    console.log('Posenet is initilized');
}

function gotPoses(results){
    if(results.length > 0)
    {
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;

    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log(leftWristX,leftWristY);

    scoreRightWrist = results[0].pose.keypoints[10].score

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log(rightWristX,rightWristY);
    
    }
    }
    
function draw(){
    image(video,0,0,600,500);
    song1status = song1.isPlaying();
    song2status = song2.isPlaying();
    fill("green");
    stroke("red");
    
    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20);
    song2.stop();
    
        if(song1status == false)
        {
            console.log(song1status);
            song1.play();
            song1.setVolume(1);
            document.getElementById("song").innerHTML = "Playing Song is music1.mp3 ";
        }
    }
    if(scoreRightWrist > 0.2)
    {
    fill("red");
    stroke("green");
    circle(rightWristX, rightWristY, 20);
    song1.stop();
    
        if(song2status == false)
        {
            console.log(song2status);
            song2.play();
            song2.setVolume(1);
            document.getElementById("song").innerHTML = "Playing Song is music2.mp3 ";
        }
    }
}

