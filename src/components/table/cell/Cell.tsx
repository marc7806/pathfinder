import React from 'react';
import "./Cell.css"
import {ICell} from "../../../types/GridTypes";

interface CellProps {
    cell: ICell,
    onClickHandler: Function
}

const getClass = (cell: ICell) => {
    let result = ["cell"];
    result.push(
        (cell.isStart ? "cell--is-start" :
            cell.isFinish ? "cell--is-finish" :
                cell.isVisited ? "cell--is-visited" : ""));

    return result.join(" ");
};

const Cell = (props: CellProps) => {
    return (
        <div onClick={() => props.onClickHandler(props.cell)} className={getClass(props.cell)}/>
    );
};

export default Cell;
