import {cellToNode, ICell, INode} from "../types/GridTypes";

export abstract class AbstractAlgorithm {
    protected finishNode: INode | null;

    protected constructor() {
        this.finishNode = null;
    }

    abstract compute(grid: Array<ICell[]>, startCell: ICell, endCell: ICell): Array<ICell>;

    abstract getShortestPath(): Array<ICell>;

    protected findNeighbors(node: INode, grid: Array<ICell[]>) {
        let neighbors: Array<INode> = [];
        let {coordinate} = node.cell;

        if (grid[coordinate.row + 1]) {
            const n = grid[coordinate.row + 1][coordinate.col];

            if (!n.isWall) {
                neighbors.push(cellToNode(n, node.distance + 1, node))
            }
        }
        if (grid[coordinate.row - 1]) {
            const n = grid[coordinate.row - 1][coordinate.col];

            if (!n.isWall) {
                neighbors.push(cellToNode(n, node.distance + 1, node))
            }
        }
        if (grid[coordinate.row][coordinate.col + 1]) {
            const n = grid[coordinate.row][coordinate.col + 1];

            if (!n.isWall) {
                neighbors.push(cellToNode(n, node.distance + 1, node))
            }
        }
        if (grid[coordinate.row][coordinate.col - 1]) {
            const n = grid[coordinate.row][coordinate.col - 1];

            if (!n.isWall) {
                neighbors.push(cellToNode(n, node.distance + 1, node))
            }
        }

        return neighbors;
    }
}
