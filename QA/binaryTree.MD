### 1.路径总和
~~~
leecode 113
深度优先遍历 前序遍历 注意传入的path是引用类型需要slice保持单次路径的独立
function pathSum (root, sum) {
    const paths = []
    preOrder(root, [])
    return  paths
    function preOrder(node, path) {
        if (!node) return
        path.push(node.val)
        if (node.left === null && node.right === null) {
            if (path.reduce((a, b) => a + b) === sum) {
                paths.push(path)
            }
            return
        }
        preOrder(node.left, path.slice(0))
        preOrder(node.right, path.slice(0))
    }
}
~~~
### 2.相同的树 && 另一个数的子树 && 树的子结构
~~~
leetcode 572
function isSubTree(p, q) {
    if (p == null) return false
    if (sameTree(p, q)) return true
    return isSubTree(p.left, q) || isSubTree(p.right, q)
}
function sameTree(s, t) {
    if (s == null && t == null) return true
    if (s == null || t == null) return false
    return s.val == t.val && sameTree(s.left, t.left) && sameTree(s.right, t.right)
}

function isSubStructure(p, q) {
    if (p == null || q == null) return false
    if (isSameTree(p, q)) return true
    return isSubStructure(p.left, q) || isSubStructure(p.right, q)

    function isSameTree(p, q) {
        if (q == null) return true
        if (p == null) return false
        return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
    }
}
~~~
### 3.有序数组转化为二叉树
~~~
leetcode 108
function buildTree(arr) {
    return build(arr)
    function build(list) {
        let mid = arr.length >> 1
        let root = new ListNode(list[mid])
        root.left = mid < 0 ? null : build(list.slice(0, mid))
        root.right = mid >= arr.length - 1 ? null : build(list.slice(mid + 1))
        return root
    }
}
~~~
### 4. 删除给定值的叶子节点
~~~
后序遍历
function removeLeafNodes = (root, target) {
    root.left && (root.left = removeLeafNodes(root.left, target))
    root.right && (root.right = removeLeafNodes(root.right, target))
    return root.left == null && root.right == null && root.val == target ? null : root
}
~~~
### 5.二叉树的右视图
~~~
leetcode 199
队列 前序遍历
function backSpaceCompare(root) {
    const reuslt = []
    if (root == null) return result
    const queue = []
    queue.push(root)
    while (queue.length !== 0) {
        let len = queue.length
        while (len > 0) {
            const node = queue.shift()
            if (len == 1)result.push(node.val)
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
            len--
        }
    }
    return result
}
~~~
### 6.对称二叉树
~~~
leetcode 101
function isSymmetric(root) {
    if(!root) return false

    function isValid(left, right) {
        if(left == null && right == null) return true
        if (left != null || right != null) return false
        if (left.val != right.val) return false
        return isValid(left.left, right.right) && isValid(left.right, right.left)
    }
    return isValid(root.left, root.right)
}
~~~
### 7.平衡二叉树
~~~
leetcode 110
function balanceTree(root) {
    if (root == null) return 0
    
    function height(node) {
        if (node == null) return 0
        return Math.max(height(node.left), height(node.right)) + 1
    }

    return Math.abs(height(node.left) - height(node.right)) < 2 && balaceTree(node.left) && balanceTree(node.right)
}
~~~
### 8.二叉树中的最大路径和
~~~
leetcode 124
function balanceTree(root) {
    let maxSum = -Inifinty
    
    function helper(node) {
        if (node == null) return 0
        let leftVal = helper(node.left)
        let rightVal = helper(node.right)
        let newPath = node.val + leftVal + rightVal
        maxSum = Math.max(newPath, maxSum)
        return node.val + Math.max(leftVal, rightVal)
    }

    helper(root)
    return maxSum
}
~~~
### 9.左叶子之和
~~~
leetcode 124
function sumOfleftNodes(root) {
    const result = [0]
    
    function helper(node, isLeft, res) {
        if (node == null) return
        if (node.left == null && node.right == null && isleft) {
            res[0] += node.val
        }
        node.left && helper(node.left, true, res)
        node.right && helper(node.right, false, res)
    }

    helper(root, false, result)
    return result[0]
}
~~~
### 10.删除二叉树节点
~~~
leetcode 124
function deleteNodes(root, key) {
    if (root == null) return null
    if (key > root.val) {
        deleteNodes(root.right, key)
    } else if (key < root.val) {
        deleteNodes(root.left, key)
    } else {
        if (root.left == null && root.right == null) {
            root = null
        } else if (root.right) {
            root.val = successor(root)
            root.right = deleteNodes(root.right, succussor)
        } else {
            root.val = predecessor(root)
            root.left = deleteNodes(root.left, succussor)
        }
    }
    return root
    
    function successor(node) {
        if (node == null) return null
        node = node.right
        while (node.left) {
            node = node.left
        }
        return node.val
    }

    function predecessor(node) {
        if (node == null) return null
        node = node.left
        while (node.right) {
            node = node.right
        }
        return node.val
    }
}
~~~
### 11.二叉树翻转
~~~
function swapNodes(root) {
    walk(root)
    return root
    function walk(node) {
        if (root === null) return 
        [root.left, root.right] = [root.right, root.left]
        walk(root.left)
        walk(root.right)
    }
}

function swapNodes(root) {
    if (root == null) return null;
    [root.left, root.right] = [swapNodes(root.right), swapNodes(root.left)];
    return root
}
~~~
### 12.二叉树最大深度
~~~
function maxDepth(root) {
    if (root == null) return 0
    const leftDepth = maxDepth.left)
    cosnt rightDepth = maxDepth(root.right)
    return Math.max(leftDepth, rightDepth) + 1
}
~~~
### 13.二叉树最小深度
~~~
function minDepth(root) {
    if (root == null) return 0
    const leftDepth = minDepth（root.left)
    cosnt rightDepth = minDepth(root.right)
    if (root.left == null || root.right == null) Math.max(leftDepth, rightDepth) + 1
    return Math.min(leftDepth, rightDepth)
}
~~~
### 14.从前序遍历和中序遍历的节点集合中构造一个binaryTree
~~~
    3
   / \
  9   20
    /   \
   15    7
//preorder = [3,9,20,15,7]
//inorder = [9,3,15,20,7]
function buildTree(preOrder, inOrder) {
    if (preOrder.length === 0 || inOrder.length === 0) return null
    const root = new ListNode(preOrder[0])
    const index = inOrder.findIndex(item => item === preOrder[0])

    root.left = buildTree(preOrder.slice(1, index + 1), inOrder.slice(0, index))
    root.right = buildTree(preOrder.slice(index + 1), inOrder.slice(index + 1))
    return root
}
~~~
### 16.从前序遍历和后序序遍历的节点集合中构造一个binaryTree
~~~
      1
     /  \
    2    3
   / \  / \
  4   5 6  7
//preorder = [1,2,4,5,3,6,7]
//postOrder = [4,5,2,6,7,3,1]
function buildTree(preOrder, postOrder) {
    if (preOrder.length === 0 || postOrder.length === 0) return null
    const root = new ListNode(preOrder[0])
    const index = postOrder.findIndex(item => item === preOrder[1])

    root.left = buildTree(preOrder.slice(1, index + 2), postOrder.slice(0, index + 1))
    root.right = buildTree(preOrder.slice(index + 2), postOrder.slice(index + 1， postOrder.length - 1))
    return root
}
~~~
### 17.二叉搜索树与双向链表
~~~
中序遍历
function treeToBuildList(root) {
    if (root == null) return
    let pre = null
    let head = null
    inOrder(root)
    
    head.left = pre
    pre.right = head
    return head

    function inOrder(node) {
        if (node == null) return
        inOrder(node.left)
        if (head == null) {
            head = node
        } else {
            pre.right = node
        }
        node.left = pre
        pre = node
        inOrder(node.right)
    }
}
~~~
### 18.序列化二叉树
~~~
//前序遍历
BinaryTree.prototype.serilized = function(root) {
    const result = []
    preOrder(root, result)
    return JSON.stringify()

    function preOrder(node, res) {
        if (node == null) res.push('#')
        result.push(node.val)
        preOrder(node.left)
        preOrder(node.right)
    }
}
BinaryTree.prototype.deserilized = function(data) {
    const d = JSON.parse(data)
    return build(d)

    function build(d) {
        const val = d.shift()
        if (val == '#') return null
        const root = new TreeNode(val)
        root.left = build(d)
        root.right = build(d)
        return root
    }
}
~~~
