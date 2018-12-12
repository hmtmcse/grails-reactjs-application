import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import RaViewComponent from "../artifacts/ra-view-component";


const styles = theme => ({
    root: {
        color:'blue'
    }
});

class DashboardView extends RaViewComponent {
    appRender () {
        const { classes } = this.props;
        return <h1 className={classes.root}>Dashboard View</h1>;
    }
}
export default withStyles(styles)(DashboardView);