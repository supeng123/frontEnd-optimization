//write a reverse linked table
function node (value, next) {
    this.value = value;
    this.next = next;
}

function reverseLinkedTable(table) {
    let previous = null;
    while (table != null) {
        let next = table.next;
        let current = previous;
        previous = current;
        current = next;
    }
    return previous;
}