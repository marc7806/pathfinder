import {MinHeap} from "./MinHeap";

test('shouldInsertAndRemoveItems', () => {
    let heap = new MinHeap();
    const obj1 = {
        cell: {},
        distance: 0,
        gScore: 0,
        hScore: 0
    };
    heap.insert(obj1);
    expect(heap.isEmpty()).toBeFalsy();
    expect(heap.removeTop()).toBe(obj1);
    expect(heap.isEmpty()).toBeTruthy();
});

test('shouldReturnItemsInCorrectOrder', () => {
    let heap = new MinHeap();
    const obj1 = {
        cell: {},
        distance: 0,
        gScore: 0,
        hScore: 0
    };
    const obj2 = {
        cell: {},
        distance: 5,
        gScore: 0,
        hScore: 0
    };
    const obj3 = {
        cell: {},
        distance: 6,
        gScore: 0,
        hScore: 0
    };
    const obj4 = {
        cell: {},
        distance: 10,
        gScore: 0,
        hScore: 0
    };

    heap.insert(obj3);
    heap.insert(obj4);
    heap.insert(obj1);
    heap.insert(obj2);

    expect(heap.isEmpty()).toBeFalsy();
    expect(heap.removeTop()).toBe(obj1);
    expect(heap.removeTop()).toBe(obj2);
    expect(heap.removeTop()).toBe(obj3);
    expect(heap.removeTop()).toBe(obj4);
});
