import * as p5 from 'p5'
import "p5/lib/addons/p5.dom";
// https://www.youtube.com/watch?v=yNkAuWz5lnY
// https://github.com/justadudewhohacks/face-api.js/tree/master/weights
// https://school.geekwall.in/p/Hy29kFEGm/face-recognition-in-the-browser-with-tensorflow-js-javascript
// https://nanonets.com/blog/object-detection-tensorflow-js/
import * as cocoSsd from '@tensorflow-models/coco-ssd';


export default function sketch (p) {

    let capture = null;
    let cocossdModel = null;

    let drawText = "";
    let drawings = [];


    function showResults(results) {

      console.log("Results : ", JSON.stringify(results));
        const id = capture.id();
      
        // drawings.push(results);
        drawings = results;
        p.redraw();
        // console.log("Id : ", id);
        setTimeout(() => {
            cocossdModel.detect(document.getElementById(id)).then(showResults);
        }, 1000)
    }

    p.setup = function () {

        p.createCanvas(1280, 720);
        const constraints = {
            video: {
              mandatory: {
                minWidth: 1280,
                minHeight: 720
              },
              optional: [{ maxFrameRate: 10 }]
            },
            audio: false
          };

        capture = p.createCapture(constraints, () => {
        });
        capture.id("video_element");
        capture.size(1280, 720);
        capture.hide();

        try {
            cocoSsd.load().then((model) => {
                try {
                    cocossdModel = model;
                    const id = capture.id();
                    console.log("Id : ", id);
                    console.log(": Detecting model details : ");
                    model
                        .detect(document.getElementById(id))
                        .then(showResults)
                        .catch((e) => {
                            console.log("Exception : ", e);
                        })
                } catch(e) {
                    console.log(e);
                }
                
            })
        } catch(e) {
            console.log(e);
        }
        
    };
  
    p.draw = () => {
        p.background(255);
        p.image(capture, 0, 0);      
        // p.fill(255, 0, 0);
        p.fill(0,0,0,0);
       
        // const results = drawings.pop();
        // if(results && results.length > 0) {
            // const drawing = drawings.pop();

            drawings.map((drawing) => {
                if (drawing) {
                    p.textSize(20);
                    p.strokeWeight(1);
                    const textX = drawing.bbox[0]+drawing.bbox[2];
                    const textY = drawing.bbox[1]+drawing.bbox[3];
    
                   
                    const confidenetext = "Confidence: "+ drawing.score.toFixed(1);
                    const textWidth = p.textWidth(confidenetext);
                    
                    const itemTextWidth = p.textWidth(drawing.class);
                    p.text(drawing.class, textX-itemTextWidth, textY-50);

                    p.text(confidenetext, textX-textWidth, textY-10);
                    p.strokeWeight(4);
                    p.stroke('rgb(100%,0%,10%)');
                    p.rect(drawing.bbox[0], drawing.bbox[1], drawing.bbox[2], drawing.bbox[3]);
                }
            })
        // }
    }
  };