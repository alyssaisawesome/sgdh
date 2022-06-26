song1="";
song2="";
rightwristX=0;
rightwristY=0;
leftwristX=0;
leftwristY=0;
leftWristScore=0;
songStatus="";

function preload() {
  song1=loadSound('music.mp3');
  song2=loadSound('music2.mp3');
}

function setup() {
  canvas = createCanvas(500,500);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  posenet = ml5.poseNet(video,modelLoaded);
  posenet.on('pose',gotPoses);
  }

  function modelLoaded() {
    console.log('model loaded');
  }

  function gotPoses(results) {
    if (results.length>0) {
  console.log(results);
  leftWristScore=results[0].pose.keypoints[9].score;
  rightWristX=results[0].pose.rightWrist.x;
  rightWristY=results[0].pose.rightWrist.y;
  leftWristX=results[0].pose.leftWrist.x;
  leftWristY=results[0].pose.leftWrist.y;
  console.log('right wrist x = ' + rightWristX + ' right wrist y = ' + rightWristY + ' left wrist x = ' + leftWristX + ' left wrist y = ' + leftWristY);
    }
  }

  function draw() {
    image(video,0,0,600,500);
    fill('red');
    stroke('red');
    songStatus=song1.isPlaying();
    if (leftWristScore>0.2) {
      circle(leftWristX,leftWristY,20);
      song2.stop();
      if (songStatus==false) {
        song1.play();
        document.getElementById('song').innerHTML="Song Name: whatever the song name is"
      }
    }
  }