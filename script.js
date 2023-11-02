let video;
let poseNet;
let poses = [];
let canvas;
let sourceType = 'webcam';

// Update source type based on dropdown selection
document.getElementById('sourceSelect').addEventListener('change', function() {
    sourceType = this.value;
    document.getElementById('fileInput').style.display = sourceType === 'upload' ? 'block' : 'none';
});

// Button click event to start the camera or video upload based on selection
document.getElementById('startBtn').addEventListener('click', function() {
    if (sourceType === 'webcam') {
        initializeWebcam();
    } else {
        document.getElementById('fileInput').click();
    }
});

document.getElementById('fileInput').addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        initializeUploadVideo(e.target.files[0]);
    }
});

function initializeWebcam() {
    let cameraOption = document.getElementById("cameraSelect").value;
    let constraints;

    if (cameraOption === "front") {
        constraints = {
            video: { facingMode: "user" },
            audio: false
        };
    } else {
        constraints = {
            video: { facingMode: { exact: "environment" } },
            audio: false
        };
    }

    canvas = createCanvas(640, 480);
    video = createCapture(constraints, function(stream) {
        console.log("Camera initialized");
    });

    video.size(width, height);
    setupPoseNet();
}


function initializeUploadVideo(file) {
    canvas = createCanvas(640, 480);
    video = createVideo(URL.createObjectURL(file), videoLoaded);
    video.size(width, height);
}

function videoLoaded() {
    video.loop();
    video.volume(0);
    setupPoseNet();
}

function setupPoseNet() {
    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on("pose", function(results) {
        poses = results;
    });
    video.hide();
}

function modelReady() {
    select("#status").html("Model Loaded");
}

function draw() {
    if (video) {
      image(video, 0, 0, width, height);
      drawKeypoints();
      drawSkeleton();
    }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i += 1) {
        const pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j += 1) {
            const keypoint = pose.keypoints[j];
            if (keypoint.score > 0.2) {
                fill(255, 255, 255);
                noStroke();
                ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
            }
        }
    }
}

// A function to draw the skeletons
function drawSkeleton() {
    for (let i = 0; i < poses.length; i += 1) {
        const skeleton = poses[i].skeleton;
        for (let j = 0; j < skeleton.length; j += 1) {
            const partA = skeleton[j][0];
            const partB = skeleton[j][1];
            stroke(255, 85, 50);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}
