import {AbstractAlgorithm} from "./AbstractAlgorithm";
import {cellToNode, ICell, INode} from "../types/GridTypes";
import {MinHeap} from "../data-structures/MinHeap";

/**
 * Dijkstra is a Greedy algorithm
 *
 * Steps:
 * 1. Initialize start node with distance 0
 * 2. Get node with minimum distance from heap and add as visited
 * 3. getNeighbors from minimum distance node
 * 4. Remove current top node from heap and add Neighbor nodes to heap
 * 5. Repeat from 2 until endCell found
 */
export class Dijkstra extends AbstractAlgorithm {
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
            let next: INode = open.removeTop();
            let nextCell = next.cell;
            if (nextCell.isFinish) {
                // end here because end cell found!
                this.finishNode = next;
                break
            }

            // mark cell as visited
            if (!nextCell.isStart && !nextCell.isWall) {
                visitedCellsInOrder.push(nextCell);
            }

            let neighbors: Array<INode> = this.findNeighbors(next, grid);

            neighbors.forEach(neighbor => {
                if (!visitedCellsInOrder.includes(neighbor.cell) && !open.includes(neighbor)) {
                    open.insert(neighbor);
                }
            });
        }

        return visitedCellsInOrder;
    }

    findNeighbors(node: INode, grid: Array<ICell[]>) {
        let neighbors: Array<INode> = [];
        let {coordinate} = node.cell;

        if (grid[coordinate.row + 1]) {
            const n = grid[coordinate.row + 1][coordinate.col];

            if (!n.isWall) {
                neighbors.push(cellToNode(n, node.distance + 1, 0, node))
            }
        }
        if (grid[coordinate.row - 1]) {
            const n = grid[coordinate.row - 1][coordinate.col];

            if (!n.isWall) {
                neighbors.push(cellToNode(n, node.distance + 1, 0, node))
            }
        }
        if (grid[coordinate.row][coordinate.col + 1]) {
            const n = grid[coordinate.row][coordinate.col + 1];

            if (!n.isWall) {
                neighbors.push(cellToNode(n, node.distance + 1, 0, node))
            }
        }
        if (grid[coordinate.row][coordinate.col - 1]) {
            const n = grid[coordinate.row][coordinate.col - 1];

            if (!n.isWall) {
                neighbors.push(cellToNode(n, node.distance + 1, 0, node))
            }
        }

        return neighbors;
    }
}
