import React, {useState} from 'react';
import "./Cell.css"
import {ICell} from "../../../types/GridTypes";

interface CellProps {
    cell: ICell,
    onClickHandler: Function,
    onMouseDownHandler: Function,
    onMouseUpHandler: Function,
    onMouseEnterHandler: Function
}

const getClass = (cell: ICell) => {
    let result = ["cell"];
    result.push(
        (cell.isStart ? "cell--is-start" :
            cell.isFinish ? "cell--is-finish" :
                cell.isWall ? "cell--is-wall" : ""));

    return result.join(" ");
};

const Cell = (props: CellProps) => {
    // to enforce state reload...
    const [reload, setReload] = useState<boolean>(false);

    return (
        <div id={"cell-" + props.cell.coordinate.row + "-" + props.cell.coordinate.col}
             onClick={() => props.onClickHandler(props.cell)}
             onMouseDown={() => props.onMouseDownHandler()}
             onMouseUp={() => props.onMouseUpHandler()}
             onMouseUpCapture={() => props.onMouseUpHandler()}
             onMouseEnter={() => props.onMouseEnterHandler(props.cell)}
             onMouseLeave={() => setReload(rel => !rel)}
             className={getClass(props.cell)}
        />
    );
};

export default Cell;
