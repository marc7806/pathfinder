export interface GridConfiguration {
    numColumns: number,
    numRows: number
}

export interface ICoordinate {
    row: number,
    col: number
}

export interface ICell {
    coordinate: ICoordinate,
    isStart: boolean,
    isFinish: boolean
}

export interface INode {
    cell: ICell,
    distance: number,
    prev: INode | null
}

export enum OnClickEventType {
    SET_FINISH,
    SET_START
}

export function cellToNode(cell: ICell, distance: number, prev: INode): INode {
    return {
        cell: cell,
        distance: distance,
        prev: prev
    }
}
