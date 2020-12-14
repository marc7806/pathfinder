import React, {useEffect, useState} from 'react';
import "./Grid.css"
import Cell from "../cell/Cell";
import {Algorithm, GridConfiguration, ICell, OnClickEventType} from "../../../types/GridTypes";
import {Dijkstra} from "../../../algorithms/Dijkstra";

let INIT_START: ICell = {
    coordinate: {
        row: 10,
        col: 5
    },
    isStart: true,
    isFinish: false,
    isWall: false
};

let INIT_END: ICell = {
    coordinate: {
        row: 14,
        col: 15
    },
    isStart: false,
    isFinish: true,
    isWall: false
};

const computeInitialGrid = (config: GridConfiguration, startCell: ICell, endCell: ICell): Array<ICell[]> => {
    let grid = []
    for (let row = 0; row < config.numRows; row++) {
        let currRow: ICell[] = [];

        for (let col = 0; col < config.numColumns; col++) {
            currRow.push({
                isStart: col === startCell.coordinate.col && row === startCell.coordinate.row,
                isFinish: col === endCell.coordinate.col && row === endCell.coordinate.row,
                isWall: false,
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
    const [algorithm, setAlgorithm] = useState<Algorithm>({name: "", instance: new Dijkstra()});
    const [onClickType, setOnClickType] = useState<OnClickEventType>(OnClickEventType.SET_START);
    const [startCell, setStartCell] = useState<ICell>(INIT_START);
    const [endCell, setEndCell] = useState<ICell>(INIT_END);
    const [isRunning, setRunning] = useState(false);
    const [visitedElements, setVisitedElements] = useState<Array<Element>>([]);
    const [isMouseDown, setMouseDown] = useState<boolean>(false);

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
            case OnClickEventType.SET_WALL:
                cell.isWall = true;
                break;
            case OnClickEventType.REMOVE_WALL:
                cell.isWall = false;
                break;
        }
        clearBoard();
    };

    const startAlgorithm = () => {
        clearBoard();
        setRunning(true)
        const visitedCells = algorithm.instance.compute(grid, startCell, endCell);
        const shortestPath = algorithm.instance.getShortestPath();
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

    const clearAll = () => {
        clearBoard();
        setGrid(computeInitialGrid(config, startCell, endCell))
    }

    useEffect(() => {
        setGrid(computeInitialGrid(config, startCell, endCell));
    }, [config, startCell, endCell])

    const handleAlgorithmSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAlgorithm(config.algorithms[parseInt(e.target.value)])
    }

    const handleMouseDown = () => {
        setMouseDown(true);
        window.addEventListener('mouseup', handleMouseUp, true);
        clearBoard();
    }

    const handleMouseUp = () => {
        setMouseDown(false);
        window.removeEventListener('mouseup', handleMouseUp, true);
    }

    const handleOnMouseEnter = (cell: ICell) => {
        if (isMouseDown && !isRunning) {
            if (onClickType === OnClickEventType.SET_WALL) {
                cell.isWall = true
            } else if (onClickType === OnClickEventType.REMOVE_WALL) {
                cell.isWall = false;
            }
        }
    }

    return (
        <div>
            <div className="algorithm-selection">
                <label>Select Algorithm:</label>
                <div className="custom-select">
                    <select onChange={(e) => handleAlgorithmSelection(e)}>
                        {
                            config.algorithms.map((algo, idx) => {
                                return <option key={idx} value={idx}>{algo.name}</option>
                            })
                        }
                    </select>
                </div>

                <button className="start-btn" disabled={isRunning}
                        onClick={() => startAlgorithm()}>
                    Start Visualization
                </button>

                <button className="start-btn" disabled={isRunning}
                        onClick={() => clearAll()}>
                    Clear
                </button>
            </div>

            <div style={{display: "flex", justifyContent: "center"}}>
                <p>
                    <input id="setStart" type="radio" value={OnClickEventType.SET_START} name="onClickEventType"
                           checked={onClickType === OnClickEventType.SET_START}
                           onChange={() => setOnClickType(OnClickEventType.SET_START)}/>
                    <label htmlFor={"setStart"}>Set Start</label>
                </p>

                <p>
                    <input id="setFinish" type="radio" value={OnClickEventType.SET_FINISH} name="onClickEventType"
                           checked={onClickType === OnClickEventType.SET_FINISH}
                           onChange={() => setOnClickType(OnClickEventType.SET_FINISH)}/>
                    <label htmlFor={"setFinish"}>Set Finish</label>
                </p>

                <p>
                    <input id="setWall" type="radio" value={OnClickEventType.SET_WALL} name="onClickEventType"
                           checked={onClickType === OnClickEventType.SET_WALL}
                           onChange={() => setOnClickType(OnClickEventType.SET_WALL)}/>
                    <label htmlFor={"setWall"}>Set Wall</label>
                </p>

                <p>
                    <input id="removeWall" type="radio" value={OnClickEventType.REMOVE_WALL} name="onClickEventType"
                           checked={onClickType === OnClickEventType.REMOVE_WALL}
                           onChange={() => setOnClickType(OnClickEventType.REMOVE_WALL)}/>
                    <label htmlFor={"removeWall"}>Unset Wall</label>
                </p>
            </div>

            <div>
                <div className="grid__container">
                    {
                        grid.map((row, rowIdx) => {
                            return <div key={rowIdx} className="grid__container__row">
                                {row.map((cell, cellIdx) =>
                                    <Cell key={cellIdx} cell={cell}
                                          onMouseDownHandler={() => handleMouseDown()}
                                          onMouseUpHandler={() => handleMouseUp()}
                                          onMouseEnterHandler={(cell: ICell) => handleOnMouseEnter(cell)}
                                          onClickHandler={(cell: ICell) => handleOnClick(cell)}
                                    />)}
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
};

export default Grid;
