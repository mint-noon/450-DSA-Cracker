import { LinkedList, ListItem } from ".";

describe('LinkedList', () => {
    it('create and add', () => {
        const list = new LinkedList<number>(new ListItem(0));
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);

        expect(list.print()).toBe('0-1-2-3-4-NULL');
    })
    it('reverse', () => {
        const list = new LinkedList<number>(new ListItem(0));
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);

        const reversedList = list.reverse();

        expect(reversedList.print()).toBe('4-3-2-1-0-NULL');
    })
    it('reverse by group', () => {
        const list = new LinkedList<number>(new ListItem(0));
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);

        const listReversedByGroup = list.reverse(3);

        expect(listReversedByGroup.print()).toBe('2-1-0-4-3-NULL');
    })
})