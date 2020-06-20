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
        preOrder(node.left, path.slice(0))
    }
}
~~~
### 2.相同的树 && 另一个数的子树
~~~
leetcode 572
function isSubTree(p, q) {
    if (p == null) return false
    if (sameTree(p, q)) return true
    return sameTree(p.left, q) || sameTree(p.right, q)
}
function sameTree(s, t) {
    if (s == null && t == null) return true
    if (s == null || t == null) return false
    return s.val == t.val && sameTree(s.left, t.left) && sameTree(s.right, t.right)
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