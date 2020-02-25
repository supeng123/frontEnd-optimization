

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

BinaryTree.prototype.find = function(node, targetData) {
    if (node === null) return false;
    if (targetData < node.data) {
        return this.find(node.left, targetData);
    } else if (targetData > node.data) {
        return this.find(node.right, targetData);
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
    let parent = null
    let isLeftChild = true
    while (p !== null, p.data !== data) {
        let parent = p;
        if (data > p.data) {
            p = p.right;
            isLeftChild = false
        } else {
            p = p.left;
            isLeftChild = true
        }
    }
    if (p == null) return;
    //p has no children at all
    if (p.left === null && p.right === null) {
        if (p === this.root) this.root = null
        else if (isLeftChild) parent.left = null
        else parent.right = null
        return parent;
    }
    //p has one child
    if(p.left === null) {
        if (isLeftChild) {
            parent.left = p.right;
        } else {
            parent.right = p.right
        }  
    } else if (p.right === null) {
        if (isLeftChild) {
            parent.left = p.left;
        } else {
            parent.right = p.left
        }
        
    }
    //p has two children, find the smallest in the right node or find the largest in the left tree
    // let leastNode = this.maxNode(node.left);
    // let leastNode = this.minNode(node.right);
    let currentLeast = node.right
    let leastNodeparent;
    while (node != null) {
        leastNodeparent = node
        currentLeast = node.left
    }
    let leastNode = this.minNode(node.right);
    if (leastNode.right) leastNodeparent.left = leastNode.right
    
    if (p == this.root) {
        this.root = leastNode
    } else if (isLeftChild) {
        leastNode.left = p.left
        leastNode.right = p.right
        parent.left = leastNode.data      
    } else {
        leastNode.left = p.left
        leastNode.right = p.right
        parent.right = leastNode.data;
    }
    
    leastNode = null;

}

// let tree = new BinaryTree();
// tree.insert(20);
// tree.insert(21);
// tree.insert(22);
// tree.insert(23);


// tree.inOrderTraverse(function (value){
//     console.log(value)
// })

// let minValue = tree.min();
// let maxValue = tree.max();
// console.log('minValue is :' + minValue);
// console.log('maxValue is :' + maxValue);

// let deleteNode = tree.delete(23);
// console.log('deleteNode :', deleteNode);
// console.log('maxValue is :' + maxValue);

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
     

// const heapResult = heapSort([5,8,3,1,4])
// console.log(heapResult)

function theSameTree(tree1, tree2) {
    if (tree1 === null && tree2 === null) return true;
    if (tree1 && tree2 && tree1.data!==tree2.data) return false;
    if (tree1 && tree2) {
        return theSameTree(tree1.left, tree2.left) && theSameTree(tree1.right, tree2.right);
    } else {
        return false;
    }
    
}

// let tree2 = new BinaryTree();
// tree2.insert(20);
// tree2.insert(21);
// tree2.insert(22);
// tree2.insert(23);

// const isSameTreeResult = isSameTree(tree, tree2)
// console.log(isSameTreeResult)

//red black tree
// all nodes are either red node or black node
//the root and leaf should be black node
//red node's children should be black nodes
//any node to the other node should contain the same number of black nodes

//new insert node should be red node
//node can rotate from left or right direction

//condition 1, when new insert node is root, change the color to black
//condition 2, when new insert node's parent is black node, new insert node's children should be black nodes
//condition 3, when new insert node's parent and uncle nodes are red, but the grandparent is black node,
//              change parent and uncle nodes to black, change grandparent node to red
//condition 4, when new insert node is left node and its parent is red node, uncle and grandparent are black nodes,
//              change parent node to black, grandparent to red, then roate in right direction
//condition 5, when new insert node is right node and its parent is red node, uncle and grandparent are black nodes,
//              rotate new insert not in left direction, then the previous red parent node should be child of newInsert node
//              take previous red parent node as condition 4 to rotate and change color respectively
