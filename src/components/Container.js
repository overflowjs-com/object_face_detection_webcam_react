import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
// import sampleSketch from './sketch/sample';
import objectDetectionSketch from './sketch/ObjectDetectionSketch';



export default class Container extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <P5Wrapper sketch={objectDetectionSketch} />
        )
    }
}