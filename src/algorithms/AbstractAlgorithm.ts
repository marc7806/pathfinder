import {ICell, INode} from "../types/GridTypes";

export abstract class AbstractAlgorithm {
    protected finishNode: INode | null;

    protected constructor() {
        this.finishNode = null;
    }

    abstract compute(grid: Array<ICell[]>, startCell: ICell, endCell: ICell): Array<ICell>;

    abstract getShortestPath(): Array<ICell>;
}
