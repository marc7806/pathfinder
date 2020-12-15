import {ICell, INode} from "../types/GridTypes";

interface DistanceFunc {
    (node: INode): number
}

export abstract class AbstractAlgorithm {
    protected finishNode: INode | null;

    protected constructor() {
        this.finishNode = null;
    }

    abstract compute(grid: Array<ICell[]>, startCell: ICell, endCell: ICell): Array<ICell>;

    public getShortestPath(): Array<ICell> {
        let shortestPath: Array<ICell> = [];

        if (this.finishNode) {
            let curr: INode = this.finishNode
            while (curr?.prev) {
                if (!curr.cell.isStart && !curr.cell.isFinish) {
                    shortestPath.push(curr.cell);
                }
                curr = curr.prev;
            }
        }

        return shortestPath.reverse();
    }
}
