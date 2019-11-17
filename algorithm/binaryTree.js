

Node = function(data) {
    this.data = data;
    this.left = null;
    this.right = null;
}

function BinaryTree() {
    this.root = null
}

BinaryTree.prototype.insert = function(data) {
    let newNode = new Node(data);
    this.root === null ? (this.root = newNode) : this.insertNode(this.root, newNode);
}

BinaryTree.prototype.insertNode = function(node, newNode) {
    if (newNode.data < node.data) {
        node.left === null ? node.left = newNode : this.insertNode(node.left, newNode);
    } else {
        node.right === null ? node.right = newNode : this.insertNode(node.right, newNode);
    }
}

BinaryTree.prototype.inOrderTraverse = function(cb) {
    this.inOrderTraverseNode(this.root, cb);
}

BinaryTree.prototype.inOrderTraverseNode= function (node, cb) {
    if (node !== null) {
        this.inOrderTraverseNode(node.left, cb);
        cb(node.data);
        this.inOrderTraverseNode(node.right, cb);
    }
}

BinaryTree.prototype.min = function() {
    if (this.root) {
        let node = this.root;
        while(node && node.left !== null) {
            node = node.left;
        }
        return node.data;
    }
    return null;
}

BinaryTree.prototype.max = function() {
    if (this.root) {
        let node = this.root;
        while(node && node.right !== null) {
            node = node.right;
        }
        return node.data;
    }
    return null;
}

let tree = new BinaryTree();
tree.insert(20);
tree.insert(21);
tree.insert(22);
tree.insert(23);


tree.inOrderTraverse(function (value){
    console.log(value)
})

let minValue = tree.min();
let maxValue = tree.max();
console.log('minValue is :' + minValue);
console.log('maxValue is :' + maxValue);


