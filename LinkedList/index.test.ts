import { LinkedList, Node } from ".";

describe('LinkedList', () => {
    it('create and add', () => {
        const list = new LinkedList<number>(new Node(0));
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);

        expect(list.print()).toBe('0-1-2-3-4-NULL');
    })

    describe('Reverse', () => {
        it('full list', () => {
            const list = new LinkedList<number>(new Node(0));
            list.add(1);
            list.add(2);
            list.add(3);
            list.add(4);

            const reversedList = list.reverse();

            expect(reversedList.print()).toBe('4-3-2-1-0-NULL');
        })
        it('by group', () => {
            const list = new LinkedList<number>(new Node(0));
            list.add(1);
            list.add(2);
            list.add(3);
            list.add(4);

            const listReversedByGroup = list.reverse(3);

            expect(listReversedByGroup.print()).toBe('2-1-0-4-3-NULL');
        })
    })

    describe('Loops', () => {
        it('detect', () => {
            const node1 = new Node(1);
            const node2 = new Node(2);
            const node3 = new Node(3);
            const node4 = new Node(4);

            node1.next = node2;
            node2.next = node3;
            node3.next = node4;
            node4.next = node2;

            const list = new LinkedList<number>(node1);

            expect(list.detectLoop()).toBe(true);
        })
        it('detect and remove', () => {
            const node1 = new Node(1);
            const node2 = new Node(2);
            const node3 = new Node(3);
            const node4 = new Node(4);

            node1.next = node2;
            node2.next = node3;
            node3.next = node4;
            node4.next = node2;

            const list = new LinkedList<number>(node1);

            list.detectAndRemoveLoop();

            expect(list.print()).toBe('1-2-3-4-NULL');
        })
    })
})