import React from 'react';
import Grid from "../components/table/grid/Grid";
import {GridConfiguration} from "../types/GridTypes";
import {Dijkstra} from "../algorithms/Dijkstra";
import {AStarAlgorithm} from "../algorithms/AStarAlgorithm";

const gridConfiguration: GridConfiguration = {
    numColumns: 50,
    numRows: 20,
    algorithms: [
        {
            name: "Dijkstra",
            instance: new Dijkstra()
        },
        {
            name: "A* Search",
            instance: new AStarAlgorithm()
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
