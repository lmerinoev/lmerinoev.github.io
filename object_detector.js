const video = document.querySelector("video");
const fileInput = document.getElementById("fileInput");
const worker = new Worker("worker.js");
const videoOptions = document.getElementById("videoOptions");
let boxes = [];
let interval
let busy = false;

videoOptions.addEventListener("change", function() {
    if (this.value === "upload") {
        fileInput.style.display = "block";
        fileInput.click();
    } else if (this.value) {
        video.src = this.value;
        // video.style.display = ""; // Keep the video hidden
        fileInput.style.display = "none";
    } else {
        // video.style.display = "none"; // The video is always hidden
        fileInput.style.display = "none";
    }
});

fileInput.addEventListener("change", function(event) {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        video.src = url;
        // video.style.display = ""; // Keep the video hidden
    }
});

video.addEventListener("play", () => {
    const canvas = document.querySelector("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    interval = setInterval(() => {
        context.drawImage(video,0,0);
        draw_boxes(canvas, boxes);
        const input = prepare_input(canvas);
        if (!busy) {
            worker.postMessage(input);
            busy = true;
        }
    },30)
});

worker.onmessage = (event) => {
    const output = event.data;
    const canvas = document.querySelector("canvas");
    boxes =  process_output(output, canvas.width, canvas.height);
    busy = false;
};

const playBtn = document.getElementById("process");
playBtn.addEventListener("click", () => {
    video.play();
});

function prepare_input(img) {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 640;
    const context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, 640, 640);
    const data = context.getImageData(0,0,640,640).data;
    const red = [], green = [], blue = [];
    for (let index=0;index<data.length;index+=4) {
        red.push(data[index]/255);
        green.push(data[index+1]/255);
        blue.push(data[index+2]/255);
    }
    return [...red, ...green, ...blue];
}

function process_output(output, img_width, img_height) {
    let boxes = [];
    for (let index=0;index<8400;index++) {
        const [class_id,prob] = [...Array(yolo_classes.length).keys()]
            .map(col => [col, output[8400*(col+4)+index]])
            .reduce((accum, item) => item[1]>accum[1] ? item : accum,[0,0]);
        if (prob < 0.5) {
            continue;
        }
        const count = 1;
        const label = 'Engage Vision ' + yolo_classes[class_id]  

        const xc = output[index];
        const yc = output[8400+index];
        const w = output[2*8400+index];
        const h = output[3*8400+index];
        const x1 = (xc-w/2)/640*img_width;
        const y1 = (yc-h/2)/640*img_height;
        const x2 = (xc+w/2)/640*img_width;
        const y2 = (yc+h/2)/640*img_height;
        boxes.push([x1,y1,x2,y2,label,prob]);
    }
    boxes = boxes.sort((box1,box2) => box2[5]-box1[5])
    const result = [];
    while (boxes.length>0) {
        result.push(boxes[0]);
        boxes = boxes.filter(box => iou(boxes[0],box)<0.7 || boxes[0][4] !== box[4]);
    }
    return result;
}

function iou(box1,box2) {
    return intersection(box1,box2)/union(box1,box2);
}

function union(box1,box2) {
    const [box1_x1,box1_y1,box1_x2,box1_y2] = box1;
    const [box2_x1,box2_y1,box2_x2,box2_y2] = box2;
    const box1_area = (box1_x2-box1_x1)*(box1_y2-box1_y1)
    const box2_area = (box2_x2-box2_x1)*(box2_y2-box2_y1)
    return box1_area + box2_area - intersection(box1,box2)
}

function intersection(box1,box2) {
    const [box1_x1,box1_y1,box1_x2,box1_y2] = box1;
    const [box2_x1,box2_y1,box2_x2,box2_y2] = box2;
    const x1 = Math.max(box1_x1,box2_x1);
    const y1 = Math.max(box1_y1,box2_y1);
    const x2 = Math.min(box1_x2,box2_x2);
    const y2 = Math.min(box1_y2,box2_y2);
    return (x2-x1)*(y2-y1)
}

function draw_boxes(canvas,boxes) {
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#E1E1E1";
    ctx.lineWidth = 3;
    ctx.font = "18px sans-serif";
    boxes.forEach(([x1,y1,x2,y2,label]) => {
        ctx.strokeRect(x1,y1,x2-x1,y2-y1);
        ctx.fillStyle = "#FF5532";
        const width = ctx.measureText(label).width;
        ctx.fillRect(x1,y1,width+10,25);
        ctx.fillStyle = "#E1E1E1";
        ctx.fillText(label, x1, y1+18);
    });
}

const yolo_classes = [
    'Visitor'
];
