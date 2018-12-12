import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import RaViewComponent from "../artifacts/ra-view-component";



class DashboardView extends RaViewComponent {
    render () {
        const { classes } = this.props;
        return <h1 className={classes.root}>Dashboard View</h1>;
    }
}
export default withStyles(styles)(DashboardView);