function paintClock(cvs, opt) {
    // function that draws a clock on canvas cvs with options opt
    let size, d, c, hours, mins, secs; // declare variables
    size = cvs.width / 2;
    d = new Date(); // use the time now to set the clock
    mins = d.getMinutes();
    hours = d.getHours();
    secs = d.getSeconds();
    
    // Hands Style
    c = cvs.getContext("2d"); // get the context of the canvas to operate with
    c.fillStyle = opt.color; // set the colour and transparency of the hands
    c.strokeStyle = opt.color;
    c.lineCap = "round"; // the end of the hands should be round
    c.translate(size, size); // set the origin to the center of the canvas

    // Minute Hand
    c.beginPath();
    c.rotate(((mins / 60) + (secs / 3600)) * (2 * Math.PI)); // rotate the canvas to the minute
    c.moveTo(0, (opt.minOverH / 10) * size);
    c.lineWidth = size * (opt.minWidth / 100); // set the thickness of the hands
    c.lineTo(0, (-opt.minLength / 10) * size);
    c.stroke(); // draw the minute hand
    c.rotate(((mins / 60) + (secs / 3600)) * (-2 * Math.PI)); // rotate the canvas back to 0
    
    // Hour Hand
    c.beginPath();
    c.rotate(((hours / 12) + (mins /720)) * (2 * Math.PI)); // rotate the canvas to the hour
    c.moveTo(0, (opt.hourOverH / 10) * size);
    c.lineWidth = size * (opt.hourWidth / 100);  // set the thickness of the hands
    c.lineTo(0, (-opt.hourLength / 10) * size);
    c.stroke(); // draw the hour hand
    c.rotate(((hours / 12) + (mins /720)) * (-2 * Math.PI)); // rotate the canvas back to 0

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

let opt = {color: "#000000",
        hourWidth: 7,
        minWidth: 7,
        minOverH: 1,
        minLength: 8.5,
        hourOverH: 2,
        hourLength: 5,
        borderWidth: 5, 
        tickNumber: 12,
        tickLen: 4,
        tickGap: 2,
        tickWidth: 1,
        numberSize: 10
        };
console.log(opt);

setInterval(document.addEventListener('DOMContentLoaded', function() {
    paintClock(document.querySelector("#clock"), opt)
    }),1000);

// document.addEventListener('DOMContentLoaded', function() {
//     paintClock(document.querySelector("#clock"),
//         {color: "#000000",
//         hourWidth: 7,
//         minWidth: 7,
//         minOverH: 1,
//         minLength: 8.5,
//         hourOverH: 2,
//         hourLength: 5,
//         borderWidth: 5, 
//         tickNumber: 12,
//         tickLen: 4,
//         tickGap: 2,
//         tickWidth: 1,
//         numberSize: 10
//         }
//     )
// })

// function updateClock() {
//     paintClockNew(document.querySelector("#clockcanvas"), {
//       size: document.querySelector("#size").value,
//       borderWidth: document.querySelector("#borderWidth").value,
//       hourlength: document.querySelector("#hourlength").value,
//       hourwidth: document.querySelector("#hourwidth").value,
//       houroverh: document.querySelector("#houroverh").value,
//       minlength: document.querySelector("#minlength").value,
//       minwidth: document.querySelector("#minwidth").value,
//       minoverh: document.querySelector("#minhang").value,
//       seclength: document.querySelector("#seclength").value,
//       secwidth: document.querySelector("#secwidth").value,
//       secoverh: document.querySelector("#sechang").value,
//       ticknumber: document.querySelector("#ticknumber").value,
//       ticklen: document.querySelector("#ticklen").value,
//       tickgap: document.querySelector("#tickgap").value,
//       tickwidth: document.querySelector("#tickwidth").value,
//       colour: document.querySelector("#colour").value,
//       numbersze: document.querySelector("#numbersze").value
//     });
//   }

// setInterval(paintClock, 10000);


// let c = document.querySelector('clock_canvas').getContext("2d");
// let size = document.querySelector('clock_canvas').height / 2;

// c.beginPath();
// c.moveTo(0,0);

// let minuteHandLength = -0.8 * (document.querySelector('clock_canvas').height / 2);

// c.lineTo(0, minuteHandLength);
// c.fillStyle = "#000000";
// c.strokeStyle = "#00000";
// c.lineCap = "round";
// c.lineWidth = 5;
// c.stroke();


// let minOverhang = 0.1;

// c.moveTo(0, minOverhang);


// let hours = d.getHours();

// c.rotate(((hours / 12) + (mins / 720)) * (2 * Math.PI));

// let hourOverhang = 0.2;

// let hourHandLength = -0.6 * (document.querySelector('clock_canvas').height / 2);

// c.moveTo(0, hourOverhang);
// c.lineTo(0, -hourHandLength);
// c.stroke();

// let mins = d.getMinutes();

// c.rotate((mins / 60) * (2 * Math.PI));

// let secs = d.getSeconds();

// c.rotate(((mins /60) + (secs /3600)) * (2 * Math.PI));

