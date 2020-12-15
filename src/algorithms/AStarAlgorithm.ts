import {AbstractAlgorithm} from "./AbstractAlgorithm";
import {cellToNode, ICell, INode} from "../types/GridTypes";
import {MinHeap} from "../data-structures/MinHeap";

/**
 * A* is an informed search algorithm (uses heuristic)
 *
 * A* is more enhanced than Dijkstra as it utilizes an heuristic function h(n) which estimates
 * how close a state is to the goal.
 *
 * The path selection is based on the cost of the path which is:
 * f(n) = g(n) + h(n)
 *
 * where n is the next node on the path, g(n) is the cost of the path from the start node to n,
 * and h(n) is a heuristic function that estimates the cost of the cheapest path from n to the goal.
 */
export class AStarAlgorithm extends AbstractAlgorithm {
    constructor() {
        super();
    }

    compute(grid: Array<ICell[]>, startCell: ICell, endCell: ICell): Array<ICell> {
        this.finishNode = null;
        let visitedCellsInOrder: Array<ICell> = [];

        const start = cellToNode(startCell, 0, 0, null);
        let open = new MinHeap();
        open.insert(start);

        while (!open.isEmpty()) {
            let curr: INode = open.removeTop();
            let currCell = curr.cell;
            if (currCell.isFinish) {
                // end here because end cell found!
                this.finishNode = curr;
                break
            }

            if (!currCell.isStart && !currCell.isWall) {
                visitedCellsInOrder.push(currCell);
            }

            let neighbors: Array<INode> = this.findNeighbors(curr, grid);
            neighbors.forEach(neighbor => {
                let newGScore = curr.gScore + 1;

                if (newGScore < neighbor.gScore) {
                    neighbor.gScore = newGScore;
                    neighbor.distance = newGScore + this.h(neighbor.cell, endCell);

                    if (!visitedCellsInOrder.includes(neighbor.cell) && !open.includes(neighbor)) {
                        open.insert(neighbor);
                    }
                }
            });
        }
        return visitedCellsInOrder;
    }

    /**
     * We use as heuristic function h(n) the 'Manhattan Distance'
     */
    private h(cell: ICell, endCell: ICell): number {
        const rowDist = Math.abs(cell.coordinate.row - endCell.coordinate.row);
        const colDist = Math.abs(cell.coordinate.col - endCell.coordinate.col);
        return rowDist + colDist;
    }

    findNeighbors(node: INode, grid: Array<ICell[]>) {
        let neighbors: Array<INode> = [];
        let {coordinate} = node.cell;

        if (grid[coordinate.row + 1]) {
            const n = grid[coordinate.row + 1][coordinate.col];

            if (!n.isWall) {
                neighbors.push(cellToNode(n, Infinity, Infinity, node))
            }
        }
        if (grid[coordinate.row - 1]) {
            const n = grid[coordinate.row - 1][coordinate.col];

            if (!n.isWall) {
                neighbors.push(cellToNode(n, Infinity, Infinity, node))
            }
        }
        if (grid[coordinate.row][coordinate.col + 1]) {
            const n = grid[coordinate.row][coordinate.col + 1];

            if (!n.isWall) {
                neighbors.push(cellToNode(n, Infinity, Infinity, node))
            }
        }
        if (grid[coordinate.row][coordinate.col - 1]) {
            const n = grid[coordinate.row][coordinate.col - 1];

            if (!n.isWall) {
                neighbors.push(cellToNode(n, Infinity, Infinity, node))
            }
        }

        return neighbors;
    }
}
