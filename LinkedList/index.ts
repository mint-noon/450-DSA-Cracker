export type Option<T> = T | null;

export class ListItem<T> {
    constructor(
        public data: Option<T> = null,
        public next: Option<ListItem<T>> = null,
    ) {}
}

export class LinkedList<T> {
    private tail: Option<ListItem<T>>;

    constructor(
        private head: ListItem<T> = new ListItem(),
    ) {
        this.tail = head;
    }

    /**
     * 
     * @param data -
     */
    add(data: T) {
        const listItem = new ListItem(data);
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
    private reverseAll(head: ListItem<T>): Option<ListItem<T>> {
        let currentItem: Option<ListItem<T>> = head;
        let previousItem: Option<ListItem<T>> = null;
        let nextItem: Option<ListItem<T>> = null;

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
    private reverseByGroup(k: number, node: ListItem<T>): Option<ListItem<T>> {
        const head = node;
        let currentItem: Option<ListItem<T>> = node;
        let previousItem: Option<ListItem<T>> = null;
        let nextItem: Option<ListItem<T>> = null;

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
    print() {
        const view: string[] = [];
        let currentItem: Option<ListItem<T>> = this.head;

        while (currentItem !== null) {
            view.push(JSON.stringify(currentItem.data));
            currentItem = currentItem.next;
        }

        view.push('NULL');

        return view.join('-');
    }
}
