import {AbstractAlgorithm} from "./AbstractAlgorithm";
import {cellToNode, ICell, INode} from "../types/GridTypes";
import {MinHeap} from "../data-structures/MinHeap";
import {isEqual} from "../utils/Utils";

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
    private readonly grid: Array<ICell[]>;
    private readonly start: ICell;
    private end: ICell;
    // needed for shortest path
    private finishNode: INode | null;

    constructor(grid: Array<ICell[]>, startCell: ICell, endCell: ICell) {
        super();
        this.grid = grid;
        this.start = startCell;
        this.end = endCell;
        this.finishNode = null;
    }

    compute(): Array<ICell> {
        let visitedCellsInOrder: Array<ICell> = [];

        const start = {
            cell: this.start,
            distance: 0,
            prev: null
        };
        let minHeap = new MinHeap();
        minHeap.insert(start);

        let isFinished = false;
        while (!isFinished) {
            let curr: INode | undefined = minHeap.removeTop();
            if (curr) {
                if (!curr.cell.isStart) {
                    visitedCellsInOrder.push(curr.cell);
                }

                let neighbors: Array<INode> = this.findNeighbors(curr);
                neighbors.forEach(n => {
                    if (isEqual(n.cell.coordinate, this.end.coordinate)) {
                        isFinished = true;
                        this.finishNode = n;
                    } else if (!visitedCellsInOrder.includes(n.cell) && !minHeap.data.includes(n)
                        && minHeap.data.filter(md => isEqual(md.cell.coordinate, n.cell.coordinate)).length === 0) {
                        minHeap.insert(n);
                    }
                });
            } else {
                console.log("Undefined node")
                break;
            }
        }

        return visitedCellsInOrder;
    }

    private findNeighbors(node: INode) {
        let neighbors: Array<INode> = [];
        let {coordinate} = node.cell;

        if (this.grid[coordinate.row + 1]) {
            neighbors.push(cellToNode(this.grid[coordinate.row + 1][coordinate.col], node.distance + 1, node))
        }
        if (this.grid[coordinate.row - 1]) {
            neighbors.push(cellToNode(this.grid[coordinate.row - 1][coordinate.col], node.distance + 1, node))
        }
        if (this.grid[coordinate.row][coordinate.col + 1]) {
            neighbors.push(cellToNode(this.grid[coordinate.row][coordinate.col + 1], node.distance + 1, node))
        }
        if (this.grid[coordinate.row][coordinate.col - 1]) {
            neighbors.push(cellToNode(this.grid[coordinate.row][coordinate.col - 1], node.distance + 1, node))
        }

        return neighbors;
    }

    getShortestPath(): Array<ICell> {
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
