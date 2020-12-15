import {AbstractAlgorithm} from "../algorithms/AbstractAlgorithm";

export interface GridConfiguration {
    numColumns: number,
    numRows: number,
    algorithms: Array<Algorithm>
}

export interface ICoordinate {
    row: number,
    col: number
}

export interface ICell {
    coordinate: ICoordinate,
    isStart: boolean,
    isFinish: boolean,
    isWall: boolean
}

export interface INode {
    cell: ICell,
    distance: number,
    prev: INode | null,

    // for A* algorithm
    gScore: number,
}

export interface Algorithm {
    name: String,
    instance: AbstractAlgorithm
}

export enum OnClickEventType {
    SET_FINISH,
    SET_START,
    SET_WALL,
    REMOVE_WALL
}

export function cellToNode(cell: ICell, distance: number,
                           gScore: number,
                           prev: INode | null): INode {
    return {
        cell: cell,
        distance: distance,
        gScore: gScore,
        prev: prev
    }
}
