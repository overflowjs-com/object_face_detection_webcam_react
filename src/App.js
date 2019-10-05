import React from 'react';
import './App.css';
import objectDetectionSketch from './ObjectDetectionSketch';

import P5Wrapper from 'react-p5-wrapper';

export default class app extends React.Component {
    
  render() {
      return (
        <P5Wrapper sketch={objectDetectionSketch} />
      )
    }
}