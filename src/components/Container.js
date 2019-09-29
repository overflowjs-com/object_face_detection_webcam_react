import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import objectDetectionSketch from './sketch/ObjectDetectionSketch';

export default class AppContainer extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
        }
    }


    render() {
        return (
            <Container maxWidth="lg">
                <Grid container spacing={2} justify="center">
                    <Grid item xs={12}>
                        <P5Wrapper  sketch={(p) => objectDetectionSketch(p)} />
                    </Grid>
                </Grid>

            </Container>
        )
    }
}