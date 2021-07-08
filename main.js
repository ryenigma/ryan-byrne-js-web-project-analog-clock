const opt = {color: "#cacfbf",
        minColor: "#afff00",
        hourWidth: 6,
        minWidth: 5,
        secWidth: 2,
        minOverH: 1,
        minLength: 8.5,
        hourOverH: 1.5,
        hourLength: 5,
        borderWidth: 5, 
        tickNumber: 12,
        tickLen: 4,
        tickGap: 2,
        tickWidth: 1,
        numberSize: 10,
        numberColor: "#afff00"
};

const cvs = document.getElementById('clock-face');
const c = cvs.getContext("2d");
const size = cvs.width / 2;
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
c.translate(size, size);

setInterval(() => {paintClock(cvs,opt)},1000);

function paintClock(cvs, opt) { // function that draws a clock on canvas cvs with options opt
    let d, hours, mins, secs, day, date; // declare variables
    d = new Date(); // use the time now to set the clock
    mins = d.getMinutes();
    hours = d.getHours();
    secs = d.getSeconds();
    day = d.getDay();
    date = d.getDate();
    
    // Set Day and Date
    document.getElementById('day-date').innerHTML = weekDays[day] + ' ' + date;

    // Hands Style
    c.clearRect(-size, -size, cvs.width, cvs.width); // reset clock hands prior to redrawing
    c.fillStyle = opt.color; // set the colour and transparency of the hands
    c.strokeStyle = opt.color;
    c.lineCap = "round"; // the end of the hands should be round
    
    // Hour Hand
    c.beginPath();
    c.strokeStyle = opt.color;
    c.rotate(((hours / 12) + (mins /720)) * (2 * Math.PI)); // rotate the canvas to the hour
    c.moveTo(0, (opt.hourOverH / 10) * size);
    c.lineWidth = size * (opt.hourWidth / 100);  // set the thickness of the hands
    c.lineTo(0, (-opt.hourLength / 10) * size);
    c.stroke(); // draw the hour hand
    c.rotate(((hours / 12) + (mins /720)) * (-2 * Math.PI)); // rotate the canvas back to 0

    // Minute Hand
    c.beginPath();
    c.strokeStyle = opt.minColor;
    c.rotate(((mins / 60) + (secs / 3600)) * (2 * Math.PI)); // rotate the canvas to the minute
    c.moveTo(0, (opt.minOverH / 10) * size);
    c.lineWidth = size * (opt.minWidth / 100); // set the thickness of the hands
    c.lineTo(0, (-opt.minLength / 10) * size);
    c.stroke(); // draw the minute hand
    c.rotate(((mins / 60) + (secs / 3600)) * (-2 * Math.PI)); // rotate the canvas back to 0
    
    // seconds Hand
    c.beginPath();
    c.strokeStyle = opt.color;
    c.rotate(((secs / 60)) * (2 * Math.PI)); // rotate the canvas to the minute
    c.moveTo(0, (opt.minOverH / 10) * size);
    c.lineWidth = size * (opt.secWidth / 100); // set the thickness of the hands
    c.lineTo(0, (-opt.minLength / 10) * size);
    c.stroke(); // draw the minute hand
    c.rotate(((secs / 60)) * (-2 * Math.PI)); // rotate the canvas back to 0

    // Draw border
    if (opt.borderWidth > 0) {
        c.beginPath();
        c.lineWidth = size * (opt.borderWidth / 100);
        c.arc(0, 0, size - (size * (opt.borderWidth / 100)), 0, 2 * Math.PI);
        c.stroke();
    }

    // Draw Tick marks
    if (parseInt(opt.tickNumber, 10) > 0) {
        for (i = 0; i < parseInt(opt.tickNumber, 10); i++) {
            c.beginPath();
            c.lineWidth = size * (opt.tickWidth / 100);
            c.moveTo(0, size - (size * (opt.borderWidth / 100)) - (size * (opt.tickGap / 100)));
            c.lineTo(0, size - (size * (opt.borderWidth / 100)) - (size * (opt.tickGap / 100)) - (size * (opt.tickLen / 100)));
            c.stroke();
            c.rotate((2 * Math.PI) / opt.tickNumber);
        }
    }
    
    // Draw Numbers
    if (parseInt(opt.numberSize, 10) > 0) {
        fontHeight = size * (opt.numberSize / 100);
        c.fillStyle = opt.numberColor;
        c.font = fontHeight + "px sans-serif";
        let fontCent39 = size - (size * (opt.borderWidth /100)) - (size * (opt.tickGap /100)) - (size * (opt.tickLen / 100)) - (size * (opt.tickGap / 100)) - c.measureText("9").width / 2;
        let fontCent126 = size - (size * (opt.borderWidth /100)) - (size * (opt.tickGap /100)) - (size * (opt.tickLen / 100)) - (size * (opt.tickGap / 100)) - (fontHeight / 2);
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText("12", 0, -fontCent126);
        c.fillText("6", 0, fontCent126);
        c.fillText("9", -fontCent39, 0);
        c.fillText("3", fontCent39, 0);
    }
}
