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

//check the table is linked from tail to head
function checkLoop(table) {
    let first = table;
    let second = table;
    while (first !=null && first.next !=null && first.next.next != null) {
        first = frist.next;
        second = second.next.next;
        if (first.value === second.value ) return true;
    }
    return false;
}

//remove the second last node
function removeSecondLastNode(table) {

}

//merge two sorted linked table
function mergeTable(table1, table2) {

}