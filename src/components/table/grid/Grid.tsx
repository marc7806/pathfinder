import React, {useEffect, useState} from 'react';
import "./Grid.css"
import Cell from "../cell/Cell";
import {GridConfiguration, ICell, ICoordinate, OnClickEventType} from "../../../types/GridTypes";

let INIT_START: ICoordinate = {
    row: 10,
    col: 5
};
let INIT_END: ICoordinate = {
    row: 14,
    col: 15
};

const Grid = (config: GridConfiguration) => {
    const [grid, setGrid] = useState<Array<ICell[]>>([[]]);
    const [onClickType, setOnClickType] = useState<OnClickEventType>(OnClickEventType.SET_START);
    const [startCell, setStartCell] = useState<ICoordinate>(INIT_START);
    const [endCell, setEndCell] = useState<ICoordinate>(INIT_END);

    const handleOnClick = (cell: ICell) => {
        switch (onClickType) {
            case OnClickEventType.SET_START:
                setStartCell(cell.coordinate);
                break;
            case OnClickEventType.SET_FINISH:
                setEndCell(cell.coordinate);
                break;
        }
    };

    useEffect(() => {
        let newGrid = []
        for (let row = 0; row < config.numRows; row++) {
            let currRow: ICell[] = [];

            for (let col = 0; col < config.numColumns; col++) {
                currRow.push({
                    isStart: col === startCell.col && row === startCell.row,
                    isFinish: col === endCell.col && row === endCell.row,
                    coordinate: {
                        row: row,
                        col: col
                    },
                    isVisited: false
                })
            }
            newGrid.push(currRow);
        }
        setGrid(newGrid);
    }, [config, startCell, endCell])

    return (
        <div>
            <div>
                <input type="radio" value={OnClickEventType.SET_START} name="onClickEventType"
                       checked={onClickType === OnClickEventType.SET_START}
                       onChange={() => setOnClickType(OnClickEventType.SET_START)}/> Set Start
                <input type="radio" value={OnClickEventType.SET_FINISH} name="onClickEventType"
                       checked={onClickType === OnClickEventType.SET_FINISH}
                       onChange={() => setOnClickType(OnClickEventType.SET_FINISH)}/> Set Finish
            </div>
            <div className="grid__container">
                {
                    grid.map((row, rowIdx) => {
                        return <div key={rowIdx} className="grid__container__row">
                            {row.map((cell, cellIdx) => <Cell key={cellIdx} cell={cell}
                                                              onClickHandler={(cell: ICell) => handleOnClick(cell)}/>)}
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default Grid;
