import { getSystemErrorMap } from "util";

export type Option<T> = T | null;

export class Node<T> {
    constructor(
        public data: Option<T> = null,
        public next: Option<Node<T>> = null,
    ) {}
}

export class LinkedList<T> {
    private tail: Option<Node<T>>;

    constructor(
        private head: Node<T> = new Node(),
    ) {
        this.tail = head;
    }

    /**
     * 
     * @param data -
     */
    add(data: T) {
        const listItem = new Node(data);
        if (this.tail !== null) {
            this.tail.next = listItem;
        }

        this.tail = listItem;
    }

    /**
     * 
     * @param groupSize -
     * @returns -
     */
    reverse(groupSize?: number): LinkedList<T> {
        let listHead = groupSize 
            ? this.reverseByGroup(groupSize, this.head)
            : this.reverseAll(this.head);

        if (listHead !== null) {
            return new LinkedList(listHead);
        }

        return new LinkedList();
    }

    /**
     * 
     * @param head -
     * @returns -
     */
    private reverseAll(head: Node<T>): Option<Node<T>> {
        let currentItem: Option<Node<T>> = head;
        let previousItem: Option<Node<T>> = null;
        let nextItem: Option<Node<T>> = null;

        while (currentItem !== null) {
            nextItem = currentItem.next;
            currentItem.next = previousItem;
            previousItem = currentItem;
            currentItem = nextItem;
        }

        return previousItem;
    }

    /**
     * 
     * @param k -
     * @param node -
     * @returns -
     */
    private reverseByGroup(k: number, node: Node<T>): Option<Node<T>> {
        const head = node;
        let currentItem: Option<Node<T>> = node;
        let previousItem: Option<Node<T>> = null;
        let nextItem: Option<Node<T>> = null;

        let i = k;

        while (i !== 0 && currentItem !== null) {
            nextItem = currentItem.next;
            currentItem.next = previousItem;
            previousItem = currentItem;
            currentItem = nextItem;

            i--;
        }

        if (nextItem !== null) {
            const rest = this.reverseByGroup(k, nextItem);
            head.next = rest;
        }

        return previousItem;
    }

    /**
     * 
     * @returns -
     */
    detectLoop() {
        if (this.head === null) {
            return false;
        }

        let slow: Option<Node<T>> = this.head;
        let fast: Option<Node<T>> = this.head;

        while (fast !== null && fast.next !== null) {
            if (slow === null) {
                return false;
            }

            slow = slow.next;
            fast = fast.next.next;

            if (fast === slow) {
                return true;
            }
        }

        return false;
    }

    /**
     * 
     * @returns -
     */
    detectAndRemoveLoop() {
        if (this.head === null) {
            return false;
        }

        let slow: Option<Node<T>> = this.head;
        let fast: Option<Node<T>> = this.head;

        while (fast !== null && fast.next !== null) {
            if (slow === null) {
                return false;
            }

            slow = slow.next;
            fast = fast.next.next;

            if (fast === slow) {
                this.removeLoop(slow);
            }
        }
    }

    /**
     * 
     * @param loop -
     * @returns -
     */
    removeLoop(loop: Option<Node<T>>) {
        if (loop === null) {
            throw Error('');
        }

        let ptr1: Option<Node<T>> = loop;
        let ptr2: Option<Node<T>> = loop;

        let k = 1;
        let i = 0;

        while (ptr1 !== null && ptr1.next !== ptr2) {
            ptr1 = ptr1.next;
            k++;
        }

        ptr1 = this.head;
        ptr2 = this.head;

        for (i = 0; i < k; i++) {
            if (ptr2 === null) {
                throw Error('');
            }
            ptr2 = ptr2.next;
        }

        while (ptr2 !== ptr1) {
            if (ptr1 === null || ptr2 === null) {
                throw Error('');
            }

            ptr1 = ptr1.next;
            ptr2 = ptr2.next;
        }

        while (ptr2 !== null && ptr2.next !== ptr1) {
            ptr2 = ptr2.next;
        }

        if (ptr2 === null) {
            throw Error('');
        }

        ptr2.next = null;
    }

    /**
     * 
     * @returns -
     */
    print() {
        const view: string[] = [];
        let currentItem: Option<Node<T>> = this.head;

        while (currentItem !== null) {
            view.push(JSON.stringify(currentItem.data));
            currentItem = currentItem.next;
        }

        view.push('NULL');

        return view.join('-');
    }
}
