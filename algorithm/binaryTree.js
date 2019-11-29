

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

//create big heap
function maxHeap(arr, index, heapSize) {
    var fatherIndex = index;
    var leftChildIndex = 2*index + 1;
    var rightChildIndex = 2*index + 2
    if (leftChildIndex <= heapSize && arr[leftChildIndex] > arr[index]) {
        index = leftChildIndex;
    } 
    if (rightChildIndex <= heapSize && arr[rightChildIndex] > arr[index]) {
        index = rightChildIndex;
    }
    if (index != fatherIndex) {
        swap(arr, fatherIndex, index);
        maxHeap(arr, index, heapSize);
    }
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

//build maxHeap
function buildMaxHeap(arr) {
    var father = Math.floor(arr.length/2)-1;
    for (var i= father; i>=0; i--){
        maxHeap(arr, i, arr.length);
    }
}

function heapSort(arr) {
    var len = arr.length;
    buildMaxHeap(arr);
    for (var i = arr.length - 1; i > 0; i--){
        swap(arr, 0, i);
        len--;
        maxHeap(arr, 0, len)
    }
    return arr;
}

// var len;
//     function buildMaxHeap(arr) {   //建堆
//         len = arr.length;
//         // [n/2-1]表示的是最后一个有子节点 (本来是n/2（堆从1数起），但是这里arr索引是从0开始，所以-1)
//         for (var i = Math.floor(len/2)-1; i>=0; i--) {
//             maxHeapify(arr, i);
//         }
//         //对每一个节点（非叶节点），做堆调整
//     }
//     function maxHeapify(arr, i) {     //堆调整
//         var left = 2*i+1,
//             right = 2*i+2,
//             largest = i;   //i为该子树的根节点
 
//         if (left < len && arr[left] > arr[largest]) {
//             largest = left;
//         }
 
//         if (right < len && arr[right] > arr[largest]) {
//             largest = right;
//         }
 
//         if (largest != i) {  //即上面的if中有一个生效了
//             swap(arr, i, largest);  //交换最大的为父节点
//             maxHeapify(arr, largest);  //交换后，原值arr[i]（往下降了）（索引保存为largest），
//             //作为根时，子节点可能比它大，因此要继续调整
//         }
//     }
//     function swap(arr, i, j) {
//         var temp = arr[i];
//         arr[i] = arr[j];
//         arr[j] = temp;
//     }
//     function heapSort(arr) {
//         buildMaxHeap(arr);
//         for (var i = arr.length-1; i > 0; i--) {
//             swap(arr, 0, i);
//             len--;
//             maxHeapify(arr, 0);
//         }
//         return arr;
//     }
     

const heapResult = heapSort([5,8,3,1,4])
console.log(heapResult)

function theSameTree(tree1, tree2) {
    if (tree1 === null && tree2 === null) return true;
    if (tree1 && tree2 && tree1.data!==tree2.data) return false;
    if (tree1 && tree2) {
        return theSameTree(tree1.left, tree2.left) && theSameTree(tree1.right, tree2.right);
    } else {
        return false;
    }
    
}

let tree2 = new BinaryTree();
tree2.insert(20);
tree2.insert(21);
tree2.insert(22);
tree2.insert(23);

const isSameTreeResult = isSameTree(tree, tree2)
console.log(isSameTreeResult)

