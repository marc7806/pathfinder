import {ICell} from "../types/GridTypes";

export abstract class AbstractAlgorithm {
    abstract compute(grid: Array<ICell[]>, startCell: ICell, endCell: ICell): Array<ICell>;

    abstract getShortestPath(): Array<ICell>;
}
