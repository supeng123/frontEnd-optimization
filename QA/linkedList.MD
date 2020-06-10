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
