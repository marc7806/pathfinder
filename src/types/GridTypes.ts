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
    isFinish: boolean,
    isVisited: boolean
}

export enum OnClickEventType {
    SET_FINISH,
    SET_START
}
