import React from 'react';
import Grid from "../components/table/grid/Grid";
import {GridConfiguration} from "../types/GridTypes";
import {Dijkstra} from "../algorithms/Dijkstra";

const gridConfiguration: GridConfiguration = {
    numColumns: 50,
    numRows: 20,
    algorithms: [
        {
            name: "Dijkstra",
            instance: new Dijkstra()
        }
    ]
};

const Main = () => {
    return (
        <div>
            <Grid {...gridConfiguration} />
        </div>
    );
};

export default Main;
