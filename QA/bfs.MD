### 1.跳跃游戏
~~~
leetcode 1345(nums) {
    let n = nums.length
    const m = {}
    nums.forEach((n, idx) => {
        if (m[n] == undefined) {
            m[n] = []
        }
        m[n].push(idx)
    })
    
    let step = 0
    let visited = {0: true}
    let queue = [0]

    while (queue.length > 0) {
        const len = queue.length
        for (let i = 0; i < len; i++) {
            const cur = queue.shift()
            if (cur == n-1) {
                return step
            }
            let next = m[nums[cur]] ? new Set(m[nums[cur]]) : new Set()
            console.log(next)
            next.add(cur+1)
            next.add(cur-1)

            next.forEach(a => {
                if ( a >= 0 && a < n && !visited[a]) {
                    visited[a] = true
                    queue.push(a)
                }
            })
            delete m[nums[cur]] 
        }
        step++
    }
    return -1
}
~~~