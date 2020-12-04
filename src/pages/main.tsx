import React from 'react';
import Grid from "../components/table/grid/Grid";
import {GridConfiguration} from "../types/GridTypes";

const gridConfiguration: GridConfiguration = {
    numColumns: 50,
    numRows: 20
};

const Main = () => {
    return (
        <div>
            <Grid {...gridConfiguration} />
        </div>
    );
};

export default Main;
