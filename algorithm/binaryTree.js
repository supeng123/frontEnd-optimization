

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

BinaryTree.prototype.find = function(targetData) {
    if (this.root === null) return false;
    if (targetData < this.root.data) {
        return this.find(this.root.left, targetData);
    } else if (targetData > this.root.data) {
        return this.find(this.root.right, targetData);
    } else {
        return true;
    }
}

BinaryTree.prototype.min = function() {
    return this.minNode(this.root) && this.minNode(this.root).data;
}

BinaryTree.prototype.minNode = function(targetNode) {
    if (targetNode) {
        let node = targetNode;
        while(node && node.left !== null) {
            node = node.left;
        }
        return node;
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

BinaryTree.prototype.delete = function(data) {
    let p = this.root;
    while (p !== null, p.data !== data) {
        parent = p;
        if (data > p.data) {
            p = p.right;
        } else {
            p = p.left;
        }
    }
    if (p == null) return;
    //p has no children at all
    if (p.left === null && p.right === null) {
        p = null;
        return p;
    }
    //p has one child
    if(p.left === null) {
        p = p.right;
        return p;
    } else if (p.right === null) {
        p = p.left;
        return p;
    }
    //p has two children, find the smallest in the right node
    let leastNode = this.minNode(node.right);
    p.data = leastNode.data;
    leastNode = null;
    return p;
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

let deleteNode = tree.delete(23);
console.log('deleteNode :', deleteNode);
console.log('maxValue is :' + maxValue);


