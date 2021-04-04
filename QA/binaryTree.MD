### 1.路径总和
~~~
leetcode 113
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

leetcode 112
function pathSum(root, sum) {
    if (!root) return false
    if (root.left == null && root.right == null) return root.val === sum
    reurn pathSum(root.left, sum - root.val) || pathSum(root.right, sum - root.val)
}

leetcode 437
function pathSum(root, sum) {
    if (root == null) return 0
    int res = findPath(root, sum)
    res += pathSum(root.left, sum)
    res += pathSum(root.right, sum)
    return res

    findPath(node, num) {
        if (node == null) return 0
        let res = 0
        if (node.val == num) res += 1
        res += findPath(node.left, num - node.val)
        res += findPath(node.right, num - node.val)
        return res
    }
}
~~~
### 2.相同的树 && 另一个数的子树 && 树的子结构 && 求和路径
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

function pathSum(root, sum) {
    if (root == null) return 0
    return dfs(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum)

    function dfs(node, sum) {
        if (node == null) return 0
        sum = sum - node.val
        return (sum == 0 ? 1 : 0) + dfs(node.left, sum) + dfs(node.right, sum)
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
            root.right = deleteNodes(root.right, root.val)
        } else {
            root.val = predecessor(root)
            root.left = deleteNodes(root.left, root.val)
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
15133693983
~~~
### 12.二叉树最大深度
~~~
function maxDepth(root) {
    if (root == null) return 0
    const leftDepth = maxDepth(root.left)
    cosnt rightDepth = maxDepth(root.right)
    return Math.max(leftDepth, rightDepth) + 1
}
~~~
### 13.二叉树最小深度
~~~
function BFS(root) {
    if (root == null) return 0
    const queue = [root]
    let depth = 1
    while (queue.length > 0) {
        let size = queue.length;
        for (let i = 0; i < size; i++) {
            let cur = queue.shift()
            if (!cur.left && ! cur.right) return depth
            cur.left && queue.push(cur.left)
            cur.right && queue.push(cur.right)
        }
        depth++
    }
}
function minDepth(root) {
    if (root == null) return 0
    const leftDepth = minDepth（root.left)
    cosnt rightDepth = minDepth(root.right)
    if (root.left == null || root.right == null) return Math.max(leftDepth, rightDepth) + 1
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
### 17.从中序遍历和后序序遍历的节点集合中构造一个binaryTree
~~~
      1
     /  \
    2    3
   / \  / \
  4   5 6  7
//postOrder = [4,5,2,6,7,3,1]
//inOrder = [4,2,5,1,6,3,7]
function buildTree(inOrder, postOrder) {
    if (inOrder.length === 0 || postOrder.length === 0) return null
    const rootValue = postOrder.pop()
    const root = new ListNode(rootValue)
    const index = inOrder.findIndex(item => item === rootValue)

    root.left = buildTree(inOrder.slice(0, index), postOrder.slice(0, index))
    root.right = buildTree(inOrder.slice(index + 1), postOrder.slice(index))
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
### 19.二叉搜索树最近公共祖先
~~~
function ancester(root, p, q) {
    if ((root.val-p.val)*(root.val-q.val) <= 0) return root
    if (p.val < root.val) return ancester(root.left, p, q)
    return ancester(root.right, p, q)
}
~~~
### 20.二叉树层序遍历
~~~
function levelOrder(root) {
    const result = []
    if (root == null)return result
    const queue = []
    queue.push(root)
    let level = 0
    while (queue.length != 0) {
        result.push([])
        let len = queue.length
        for (let i = 0; i < len; i++) {
            let current = queue.shift()
            result[level].push(current.val)
            current.left && queue.push(current.left)
            current.right && queue.push(current.right)
        }
        level++
    }
    return result
}
~~~
### 21.后继者
~~~
var inorderSuccessor = function(root, p) {
    let findCurr = false
    let result = null

    function inOrder(node) {
        if (node == null) return
        inOrder(node.left)
        if (findCurr && result == null) {
            result = node
            return
        }
        if (node == p) {
            findCurr = true
        }
        inOrder(node.right)
    }
    return result
}

inorderSuccessor = function(root, p) {
    if (root == null) return null
    if (root.val < p.val) {
        return inorderSuccessor(root.right,p) 
    } else if (root.val == p.val) {
        const node = root.right
        while (node && node.left) node = node.left
        return node
    } else {
        return inorderSuccessor(root.left,p) || root
    }
}
~~~
### 22.堆排序
~~~
function heapSort(nums) {
    let length = nums.length
    let index = Math.floor(nums.length/2)-1
    for (let i = index; i <= len; i++) {
        buildTree(length; i)
    }

    function buildTree(heapSize, index) {
        let maxIndex = index
        let leftIndex = index*2+1
        let rightIndex = index*2+2
        if (leftIndex <= heapSize && nums[index] < nums[leftIndex]) {
            maxIndex = leftIndex
        }
        if (rightIndex <= heapSize && nums[index] < nums[rightIndex]) {
            maxIndex = rightIndex
        }
        if (maxIndex != index) {
            nums[nums[maxIndex], nums[index]] = nums[nums[index], nums[maxIndex]]
            buildTree(heapSize, maxIndex)
        }
    }

    for (let i = length-1; i > 0; i--) {
        nums[nums[0], nums[i]] = nums[nums[i], nums[0]]
        buildTree(i, 0)
    }
    return nums
}
~~~
### 23.二叉树直径
~~~
function diameter(root) {
    if (root == null) return 0
    const temp = height(root.left) + height(root.right)
    return Math.max(temp, diameter(root.left), diameter(root.right))
}

function height(node) {
    if (node == null) return 0
    return Math.max(height(node.left), height(node.right)) + 1
}
~~~
### 24.二叉树公共祖先
~~~
function ancestor(root, p, q) {
    if (!root || root == p || root == q) return root
    let left = ancestor(root.left, p, q)
    let right = ancestor(root.right, p, q)
    if (left && right) return root
    return left ? left : right
}

left = ancestor(2) ===> node(2)
right = ancestor(3) ===> node(3)
    1
  2   3
4  5 6  7
~~~
### 25.二叉树交换子节点
~~~
function swapNodes(root) {
    const queue = [root]
    while (queue.length > 0) {
        const current = queue.pop()
        [current.left, current.right] = [current.right, current.left]
        queue.unshift(current.right)
        queue.unshift(current.left)
    }
    return root
}
~~~
### 26.二叉树最短距离
~~~
function shortestDistance(root, p, q) {
    const commonAncestor = ancestor(root, p, q)
    let pfound = false
    let qfound = false
    const pNodes=[]
    const qNodes=[]
    getDistance(commonAncestor, p, pNodes, pfound)
    getDistance(commonAncestor, q, qNodes, qfound)
    return pNodes.length+qNodes.length
    
    function getDistance(root, target, stack, pfound) {
        if (!root) return
        stack.push(root.val)
        if (root == target) {
            isFound = true
            return
        }
        if (!isFound && root.left) {
            getDistance(root.left, target, stack, pfound)
        }

        if (!isFound && root.right) {
            getDistance(root.right, target, stack, pfound)
        }
        stack.pop()
        return
    }
}
~~~
### 27.完全二叉树的节点个数
~~~
leetcode 222
function countNodes(root) {
    return root ? countNodes(root.left) + countNodes(root.right) + 1 : 0
}
~~~
### 28.将有序数组转换为二叉搜索树
~~~
function changeArrayToBinaryTree(arr) {
    if(arr.length === 0) return null;
    let mid = arr.length >> 1
    root = new TreeNode(arr[mid])
    root.left = changeArrayToBinaryTree(arr.slice(0, mid))
    root.right = changeArrayToBinaryTree(arr.slice(mid + 1))
    return root
}
~~~
### 29.最小高度树
~~~
function leastHeightTree(list) {
    if (list.length === 0) return null
    return build(list)
    function build(arr) {
        const index = arr.length >> 1
        const root =  new Node(arr[index])
        root.left = build(arr.slice(0, index))
        root.right = build(arr.slice(index+1))
        return root
    }
}
~~~
### 30.二叉树中的最长交错路径
~~~
leetcode 1372
var longestZigzag = function(root) {
    let max = 0
    dfs(root)
    return max
    function dfs(node) {
        if (!node) return [-1, -1]
        const [ll, lr] = dfs(node.left)
        const [rl, rr] = dfs(node.right)
        const l = lr + 1
        const r = rl + 1
        max = Math.max(max, l)
        max = Math.max(max, r)
        return [l, r]
    }
};
~~~
### 31.分裂二叉树的最大乘积
~~~
leetcode 1339
function maxProduct(root) {
    let res = 0
    const total = sum(root)
    split(root)
    return res

    function split(node) {
        if (!node) return 0
        const left = split(node.left)
        const right = split(node.right)
        res = Math.max(res, (res-left)*left)
        res = Math.max(res, (res-right)*right)
        return left+right+node.val
    }

    function sum(node) {
        if(!node) return 0
        const left = sum(node.left)
        const right = sum(node.right)
        return left+right+node.val
    }
}
~~~
### 32.二叉树着色
~~~
leetcode 1145
function btreeGameWinningMove(root, n, x) {
    let left,right;
    const red = x
    sum(root)
    return Math.max(Math.max(left,right), n-left-right-1) > n/2

    function sum(node) {
        if(!node) return 0
        const l = sum(node.left)
        const r = sum(node.right)
        if (node.val == red) {
            left = l
            right = r
        }
        return left+right+1
    }

}
~~~
### 33.重组字符串
~~~
leetcode 676
function reOrganizeString(S) {
    let counts = {}
    for (let i = 0; i < S.length; i++) {
        let c = S.charAt(i)
        if (!counts[c]) counts[c] = 0
        counts[c]++
    }

    let heap = new Heap()
    for (let key in counts) {
        if (counts[key] > ((S.length+1)/2)) return ''
        heap.insert({val: counts[key], content:key})
    }

    let res = []
    let lastC
    while (heap.size() > 2) {
        let node1 = heap.extractMax()
        let node2 = heap.extractMax()
        if (node1.content != lastC) {
            res.push(node1.content)
            res.push(node2.content)
            lastC = node2.content
        } else {
            res.push(node2.content)
            res.push(node1.content)
            lastC = node1.content
        }

        node1.val--
        node2.val--
        if (node1.val > 0) {
            heap.insert(node1)
        }
        if (node2.val > 0) {
            heap.insert(node2)
        }

        if (heap.size() > 0) {
            let node1 = heap.extractMax()
            res.push(node1.content)
        }
    }
    return res.join('')
}

let Heap = function() {
    this.list = []
}

Heap.prototype.insert = function (node) {
    this.list.push(node)
    let k = this.list.length

    while (k > 0) {
        let p = Math.floor((k-1)/2)
        if (this.list[p].val < this.list[k].val) {
            let temp = this.list[p]
            this.list[p] = this.list[k]
            this.list[k] = temp

            k = p
        } else {
            break
        }
    }
}

Heap.prototype.extractMax = function() {
    let k = this.size()
    let res 
    if (k == 0) return
    if (k == 1) {
        return this.list.pop()
    } else {
        res = this.list[0]
        this.list[0] = this.list.pop()
    }

    k = 0
    let left = 2*k+1
    while (left < this.size()) {
        let right = left+1
        let max = left
        
        if (right < this.size()) {
            if (this.list[right].val > this.list[left].val) {
                max = right
            }
        }

        if (this.list[k].val < this.list[max].val) {
            let temp = this.list[k]
            this.list[k] = this.list[max]
            this.list[max] = temp

            k = max
            left = 2*k+1
        } else {
            break
        }
    }
    return res
}

Heap.prototype.size = function() {
    return this.list.length
}
~~~
### 填充每个节点的下一个右侧节点指针  
~~~
     1
    2  3
   4 5 6 7
leetcode 116
functio connect(root) {
    let pre = root
    let cur
    while(pre && pre.left) {
        cur = pre
        while(cur) {
            cur.left.next = cur.right
            if (cur.next) {
                cur.right.next = cur.next.left  //2将右子树5指向同级3节点的左子树6
            }
            cur = cur.next
        }

        pre = pre.left
    }
    return root
}
~~~
### 二叉搜索树迭代器
~~~
leetcode 173

var BSTIterator = fucntion (root) {
    this.stack = []
    let cur = root
    while(cur) {
        this.stack.push(cur)
        cur = cur.left
    }
}

BSTIterator.prototype.hasNext = function() {
    return this.stack.length > 0
}

BSTIterator.prototype.next = function() {
    if (this.stack.length <= 0) return null
    let n = this.stack.pop()
    let cur = n.right
    while(cur) {
        this.stack.push(cur)
        cur = cur.left
    }
    return n.val
}
~~~
### 二叉树最深的子树
~~~
leetcode 865
function deepestSubtree(root) {
    if (root == null) return null
    const result = recur(root)
    return result[1]

    function recur(node) {
        if (!node) return [0, null]
        const l = recur(node.left)
        const r = recur(node.right)
        if (l[0] > r[0]) {
            return [l[0]+1, l]
        } else if (l[0] < r[0]) {
            return [r[0]+1, r]
        } else {
            return [l[0]+1, node]
        }
    }
}
~~~