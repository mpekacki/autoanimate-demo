import { LightningElement, track } from 'lwc';
import autoAnimate from 'c/autoanimate';

export default class TodoList extends LightningElement {
    aaInitialized = false;
    @track _items = [
        { id: 1, name: 'LWC' },
        { id: 2, name: 'Aura' },
        { id: 3, name: 'LWS' },
        { id: 4, name: 'JavaScript' },
        { id: 5, name: 'Apex' }
    ];
    get maxId() {
        return this._items.reduce((max, item) => Math.max(max, item.id), 0);
    }
    newItemName = '';

    get isSorted() {
        return this._items.slice().sort((a, b) => a.name.localeCompare(b.name)).every((item, index) => item.id === this._items[index].id);
    }

    get items() {
        return this._items.map((item, index) => ({
            ...item,
            canNotMoveUp: index === 0,
            canNotMoveDown: index === this._items.length - 1
        }));
    }

    renderedCallback() {
        if (this.aaInitialized) {
            return;
        }
        const animContainer = this.template.querySelector('.animContainer');
        if (!animContainer) {
            return;
        }
        autoAnimate(animContainer);
        this.aaInitialized = true;
    }

    handleAddItem() {
        if (!this.newItemName.trim()) return;
        this._items = [...this._items, { id: this.maxId + 1, name: this.newItemName.trim() }];
        this.newItemName = '';
    }

    handleKeyUp(event) {
        if (event.key === 'Enter') {
            this.handleAddItem();
        }
    }

    handleMove(event, direction) {
        const itemId = parseInt(event.target.dataset.id, 10);
        const index = this._items.findIndex(item => item.id === itemId);
        const isValidMove = direction === 'up' ? index > 0 : index < this._items.length - 1;

        if (isValidMove) {
            const swapIndex = direction === 'up' ? index - 1 : index + 1;
            this._items = this._items.map((item, i) => {
                if (i === index) return this._items[swapIndex];
                if (i === swapIndex) return this._items[index];
                return item;
            });
        }
    }

    handleMoveDown(event) {
        this.handleMove(event, 'down');
    }

    handleMoveUp(event) {
        this.handleMove(event, 'up');
    }

    handleNewItemChange(event) {
        this.newItemName = event.target.value;
    }

    handleRemoveItem(event) {
        const itemId = parseInt(event.target.dataset.id, 10);
        this._items = this._items.filter(item => item.id !== itemId);
    }

    handleSortItems() {
        this._items = [...this._items].sort((a, b) => a.name.localeCompare(b.name));
    }
}
