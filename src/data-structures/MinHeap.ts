/**
 * Binary heap (min-heap) used for dijkstra algorithm
 * Reference: https://medium.com/dev-genius/how-to-implement-a-binary-heap-javascript-d3a0c54112fa
 *
 * Insert: O(logn)
 * GetMin: O(logn)
 */
import {INode} from "../types/GridTypes";
import {isEqual} from "../utils/Utils";

export class MinHeap {
    data: Array<INode>;

    constructor() {
        this.data = []
    }

    public isEmpty(): boolean {
        return this.data.length === 0;
    }

    public insert(item: INode): void {
        this.data.push(item);
        this.reorganize(this.data.length - 1);
    }

    /**
     * Reorganizes values in heap
     */
    private reorganize(index: number) {
        let parentIndex = Math.floor((index + 1) / 2 - 1);
        if (parentIndex < 0) parentIndex = 0;

        let parentVal = this.data[parentIndex].distance;
        const pushedVal = this.data[index].distance;
        while (index > 0 && parentVal > pushedVal) {
            parentIndex = Math.floor((index + 1) / 2 - 1);
            this.swap(index, parentIndex);
            index = parentIndex;
            parentVal = this.data[Math.max(Math.floor((index + 1) / 2 - 1), 0)].distance;
        }
    }

    private swap(index: number, parentIndex: number) {
        let tmp = this.data[parentIndex]
        this.data[parentIndex] = this.data[index];
        this.data[index] = tmp;
    }

    /**
     * Removes top element from heap
     */
    public removeTop(): INode {
        if (!this.isEmpty()) {
            let temp = this.data.pop();
            if (!temp) throw new Error("Undefined heap element found")

            if (this.data.length < 1) return temp;

            const ret: INode = this.data[0]; // What we will return
            this.data[0] = temp; // Place last element in array at front
            let i = 0; // We adjust heap from top to down

            while (true) {
                let rightChildIndex = (i + 1) * 2;
                let leftChildIndex = (i + 1) * 2 - 1;
                let lowest = rightChildIndex;
                if (leftChildIndex >= this.data.length && rightChildIndex >= this.data.length) break;

                if (leftChildIndex >= this.data.length) lowest = rightChildIndex;
                if (rightChildIndex >= this.data.length) lowest = leftChildIndex;

                // Find the smallest child
                if (!(leftChildIndex >= this.data.length) && !(rightChildIndex >= this.data.length)) {
                    lowest = this.data[rightChildIndex].distance < this.data[leftChildIndex].distance ? rightChildIndex : leftChildIndex;
                }

                // If the parent is greater than the smallest child: swap
                if (this.data[i].distance > this.data[lowest].distance) {
                    this.swap(i, lowest);
                    i = lowest;
                } else break;
            }
            return ret;
        }
        throw new Error("Empty Heap");
    }

    includes(n: INode) {
        return this.data.filter(md => isEqual(md.cell.coordinate, n.cell.coordinate)).length !== 0;
    }
}
