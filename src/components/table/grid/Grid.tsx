import React, {useEffect, useState} from 'react';
import "./Grid.css"
import Cell from "../cell/Cell";
import {GridConfiguration, ICell, OnClickEventType} from "../../../types/GridTypes";
import {Dijkstra} from "../../../algorithms/Dijkstra";

let INIT_START: ICell = {
    coordinate: {
        row: 10,
        col: 5
    },
    isStart: true,
    isFinish: false,
};

let INIT_END: ICell = {
    coordinate: {
        row: 14,
        col: 15
    },
    isStart: false,
    isFinish: true,
};

const computeInitialGrid = (config: GridConfiguration, startCell: ICell, endCell: ICell): Array<ICell[]> => {
    let grid = []
    for (let row = 0; row < config.numRows; row++) {
        let currRow: ICell[] = [];

        for (let col = 0; col < config.numColumns; col++) {
            currRow.push({
                isStart: col === startCell.coordinate.col && row === startCell.coordinate.row,
                isFinish: col === endCell.coordinate.col && row === endCell.coordinate.row,
                coordinate: {
                    row: row,
                    col: col
                },
            })
        }
        grid.push(currRow);
    }
    return grid;
}

const Grid = (config: GridConfiguration) => {
    const [grid, setGrid] = useState<Array<ICell[]>>([[]]);
    const [onClickType, setOnClickType] = useState<OnClickEventType>(OnClickEventType.SET_START);
    const [startCell, setStartCell] = useState<ICell>(INIT_START);
    const [endCell, setEndCell] = useState<ICell>(INIT_END);
    const [isRunning, setRunning] = useState(false);
    const [visitedElements, setVisitedElements] = useState<Array<Element>>([]);

    const handleOnClick = (cell: ICell) => {
        if (isRunning) return

        switch (onClickType) {
            case OnClickEventType.SET_START:
                startCell.isStart = false;
                cell.isStart = true
                setStartCell(cell);
                break;
            case OnClickEventType.SET_FINISH:
                endCell.isFinish = false;
                cell.isFinish = true
                setEndCell(cell);
                break;
        }
    };

    const startDijkstra = () => {
        clearBoard();
        setRunning(true)
        const dijkstra = new Dijkstra(grid, startCell, endCell);
        const visitedCells = dijkstra.compute();
        const shortestPath = dijkstra.getShortestPath();
        animate(visitedCells, shortestPath);
    }

    const animate = (visited: Array<ICell>, shortestPath: Array<ICell>) => {
        let visitedEl: Array<Element> = []
        for (let i = 0; i < visited.length; i++) {
            setTimeout(() => {
                let currCell = visited[i]
                let el = document.getElementById("cell-" + currCell.coordinate.row + "-" + currCell.coordinate.col);
                if (el) {
                    el.classList.add("cell--is-visited");
                    visitedEl.push(el)
                }
            }, 10 * i)
        }

        // show shortest path after visited nodes are visualized
        setTimeout(() => {
            // animate shortest path
            for (let i = 0; i < shortestPath.length; i++) {
                setTimeout(() => {
                    let currCell = shortestPath[i]
                    let el = document.getElementById("cell-" + currCell.coordinate.row + "-" + currCell.coordinate.col);
                    if (el) {
                        el.classList.add("cell--is-shortest-path");
                    }
                }, 30 * i)
            }

            setTimeout(() => {
                setVisitedElements(visitedEl);
                setRunning(false)
            }, 10 * shortestPath.length)
        }, 10 * visited.length)
    }

    const clearBoard = () => {
        for (let el of visitedElements) {
            el.classList.remove("cell--is-visited")
            el.classList.remove("cell--is-shortest-path")
        }
    }

    useEffect(() => {
        clearBoard();
        setGrid(computeInitialGrid(config, startCell, endCell));
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

                <button disabled=
                            {isRunning} onClick={() => startDijkstra()}>Start Dijkstra Algorithm
                </button>
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
        </div>
    )
};

export default Grid;
