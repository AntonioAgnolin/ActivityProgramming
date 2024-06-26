class Node {
    constructor(value, priority, color) {
        this.value = value;
        this.priority = priority;
        this.color = color;
        this.next = null;
    }
}

class PriorityColorLinkedList {
    constructor() {
        this.head = null;
    }

    add(value, priority, color) {
        const newNode = new Node(value, priority, color);

        if (!this.head || (this.head.color !== 'Amarelo' && newNode.color === 'Amarelo')) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next && (current.next.color !== 'Amarelo' && newNode.color === 'Amarelo')) {
                current = current.next;
            }
            newNode.next = current.next;
            current.next = newNode;
        }
    }

    remove(value) {
        if (!this.head) return;

        if (this.head.value === value) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next && current.next.value !== value) {
            current = current.next;
        }

        if (current.next) {
            current.next = current.next.next;
        } else {
            console.log(`Item ${value} não encontrado.`);
        }
    }

    displayByColor() {
        const colorGroups = {};

        let current = this.head;
        while (current) {
            if (!colorGroups[current.color]) {
                colorGroups[current.color] = [];
            }
            colorGroups[current.color].push({ value: current.value, priority: current.priority });
            current = current.next;
        }

        for (const color in colorGroups) {
            console.log(`Color: ${color}`);
            colorGroups[color].forEach(node => {
                console.log(`  Value: ${node.value}, Priority: ${node.priority}`);
            });
        }
    }
}

const list = new PriorityColorLinkedList();
list.add('Tomar café da manhã', 1, 'Amarelo');
list.add('Arrumar o quarto', 2, 'Azul');
list.add('Lavar as roupas', 2, 'Vermelho');
list.add('Estudar para a prova', 3, 'Verde');

list.displayByColor();

console.log('--- Removendo Tarefa "Estudar para a prova" ---');
list.remove('Estudar para a prova');
list.displayByColor();
