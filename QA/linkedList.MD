### 1.两数相加
~~~
leecode 2
哨兵节点
function addTwoNumbers (l1, l2) {
    const dummyNode = new ListNode()
    let carry  = 0
    let sum = 0
    let current = dummyNode
    while (l1 || l2) {
        sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry
        carry = sum >= 10 ? 1 : 0
        const newNode = new ListNode(sum%10)
        current.next = newNode
        current = current.next
        l1 && (l1 = l1.next)
        l2 && (l2 = l2.next)
    }
    if (carry > 0) (current.next = new ListNode(carry))
    return dummyNode.next
}
~~~
### 2.删除链表里面的元素
~~~
leecode 237
哨兵节点
function removeNode(head, target) {
    const dummyNode = {
        next: head
    }
    let cur = dummyNode
    while (cur && cur.next) {
        if (cur.next.val = target) {
            cur.next = cur.next.next
        }
        cur = cur.next
    }
    return dummyNode.next
}
~~~
### 3.反转链表
~~~
leecode 206
哨兵节点
function reverseLinkedList(head, target) {
    const dummyNode = {
        next: head
    }
    let cur = dummyNode.next
    let pre = null
    while (cur) {
        let next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return dummyNode.next
}
~~~
### 3.奇偶链表
~~~
leecode 328
哨兵节点
function oddEvenList(head) {
    if (!head || !head.next) return head
    const dummyNodeOdd = {
        next: head
    }
    const dummyNodeEven = {
        next: head.next
    }
    let oddList = dummyNodeOdd.next
    let evenList = dummyNodeEven.next
    while (oddList && oddList.next && evenList && evenList.next) {
        const odd = oddList.next.next
        const even = evenList.next.next
        oddList.next = odd
        evenList.next = even
        oddList = odd
        evenList = even
    }
    oddList.next = dummyNodeEven.next
    return dummyNodeOdd.next
}
~~~
### 4.分割链表
~~~
function teardownList(head, x) {
    let cur = head
    const dummySmall = small = new ListLink(-1)
    const dummyGreat = great = new ListLink(-1)

    while (cur) {
        if (cur.val < x) {
            small.next = cur
            small = small.next
        } else {
            great.next = cur
            great = great.next
        }
        cur = cur.next
    }
    great.next = null
    small.next = great
    return dummySmall.next
}
~~~
### 5.合并两个有序链表
~~~
function mergeLists(l1, l2) {
    const dummyHead = new ListNode(0)
    let cur = dummyHead
    while (l1 !== null && l2 !=== null) {
        if (l1.val < l2.val) {
            cur.next = l1.val
            l1 = l1.next
        } else {
            cur.next = l2.val
            l2 = l2.next
        }
        cur = cur.next
    }
    if (l1 !== null) cur.next = l1
    if (l2 !== null) cur.next = l2

    return dummyHead.next
}
~~~
### 6.删除指定删除链表的节点
~~~
function removeTargetNode(head, target) {
    const dummyNode = {
        next: head
    }
    let pre = dummyNode
    let cur = dummyNode.next
    if (cur.val == target) dummyNode.next = dummyNode.next.next

    while (pre !== null && cur !== null) {
        if (cur.val === target) break
        pre = cur
        cur = cur.next
    }
    pre.next = cur ? cur.next : null
    return dummyNode.next
}
~~~
### 7.删除排序链表中的重复元素
~~~
//leetcode 83
判断下一个节点是不是等于当前节点
function removeDuplicates(head) {
    let cur = head
    while (cur !== null) {
        let nextNode = cur.next
        while (nextNode && nextNode.val == cur.val) {
            nextNode = nextNode.next
        }
        cur.next = nextNode
        cur = nextNode
    }
    return head
}
~~~
### 8.回文链表
~~~
leetcode 234
function isPalidrom(head) {
    const result = []
    while (head) {
        result.push(head.val)
        head = head.next
    }
    while (result.length > 1) {
        if (result.pop() !== result.shift()) return false
    }
    return true
}
~~~
### 9.排序链表
~~~
归并排序
function sortList(head) {
    let slow = head
    let fast = head
    while (fast) {
        slow = slow.next
        fast = fast.next
    }
    let rightNode = slow.next
    slow.next = null
    let leftNode = head

    return merge(sortList(leftNode), sortList(rightNode))
    
    function merge(left, right) {
        let l = left
        let r = right
        const dummyNode = new ListNode()
        let cur = dummyNode
        while (l && r) {
            if (l.val < r.val) {
                cur.next = l
                l = l.next
            } else {
                cur.next = r
                r = r.next
            }
            cur = cur.next
        }
        cur.next = l ? l : r
        return dummyNode.next
    }
}
~~~
### 10.环形链表
~~~
快慢指针
function roundList(head) {
    let fast = head
    let slow = head
    let start = head
    while (fast) {
        slow = slow.next
        fast = fast.next.next
        if (slow == false) {
            while (slow != start) {
                start = start.next
                slow = slow.next
            }
            return slow
        }
    }
    return null
}
~~~
### 11.链表交换节点
~~~
leetcode 24
function changeNode(head) {
    if (!head || !head.next) return head
    const dummyNode = {
        next: head
    }
    let cur = dummyNode
    while (cur.next && cur.next.next) {
        let startNode = cur.next
        let endNode = cur.next.next

        cur.next = endNode
        startNode.next = endNode.next
        endNode.next = startNode
        cur = startNode
    }
    return dummyNode.next
}
~~~
### 12.删除链表重复节点
~~~
function deleteRepeatedNodes(head) {
    const map = {}
    const dummyNode = {
        next: head
    }
    let pre = dummyNode
    let cur = dummyNode.next
    while (cur) {
        const currentValue = cur.val
        if (map[currentValue] == undefined) {
            map[currentValue] = true
            pre = cur
            cur = cur.next
        } else {
            cur = cur.next
            pre.next = cur
        }
    }
    return dummyNode.next
}
~~~