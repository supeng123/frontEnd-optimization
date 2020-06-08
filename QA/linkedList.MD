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
### 2