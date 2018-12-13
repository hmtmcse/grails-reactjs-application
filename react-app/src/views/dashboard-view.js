import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import RaViewComponent from "../artifacts/ra-view-component";
import { Chart } from "react-charts";


const styles = theme => ({
    root: {
        color:'blue'
    }
});

class DashboardView extends RaViewComponent {
    appRender () {
        const { classes } = this.props;
        return (
            <div
                style={{
                    width: "800px",
                    height: "500px"
                }}
            >
                <Chart
                    data={[
                        {
                            label: "Series 1",
                            data: [[0, 1], [1, 2], [2, 10], [3, 2], [4, 7]]
                        },
                        {
                            label: "Series 2",
                            data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
                        }
                    ]}
                    axes={[
                        { primary: true, type: "linear", position: "bottom" },
                        { type: "linear", position: "left" }
                    ]}
                />
            </div>
        );
    }
}
export default withStyles(styles)(DashboardView);