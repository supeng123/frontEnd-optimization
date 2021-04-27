1. ### 形成三的最大倍数
~~~
leetcode 1363
function largestMultipleOfThree(digits) {
    const remain1 = []
    const remain2 = []
    const sum = digits.reduce((total, cur) => total+cur, 0)
    digits.sort((a,b)=> a-b)

    digits.forEach((d, index) => {
        if (d%3 == 1) {
            if (remain1.length < 2) {
                remain1.push(index)
            }
        }
        if (d%3 == 2) {
            if (remain2.length < 2) {
                remain2.push(index)
            }
        }
    })

    function getResString (remove1, remove2) {
        let resDigits = []
        for (let i = digits.length-1; i >= 0; i--) {
            const d = digits[i]
            if (i != remove1 && i != remove2 ) {
                resDigits.push(d)
            }
        }
        let i = 0
        while (i < resDigits.length - 1 && resDigits[i] == 0) {
            i++
        }
        return resDigits.slice(i).join('')
    }

    if (sum % 3 == 1) {
        if (remain1.length > 0) {
            return getResString(remain1[0], -1)
        }
        return getResString(remain2[0], remain2[1])
    } else if (sum % 3 == 2) {
        if (remain2.length > 0) {
            return getResString(remain2[0], -1)
        }
        return getResString(remain1[0], remain1[1])
    }
    return getResString(-1, -1)
} 
~~~
### 时针和分针的角度
~~~
leetcode 1344
function angle (hour, minutes) {
    const degreePerMinute = 360/60
    const degreePerHour = 360/12
    const a = minutes*degreePerMinute
    const b = hour*degreePerHour + minutes/60*degreePerHour
    const degree = Math.abs(a-b)
    return Math.min(360-degree, degree)
}
~~~
### 最小面积矩形
~~~
leetcode 939
let res  = Number.MAX_SAFE_INTEGER
    const grid = {}
    const n = points.length
    for (i = 0; i < n; i++) {
        const p = points[i]
        key = p[0] + '+' + p[1]
        grid[key] = true
    }
    console.log(grid)
    for (let i = 0; i < n; i++) {
        for (let j = 1; j < n; j++) {
            const pointA = points[i]
            const pointB = points[j]
            const ax = pointA[0]
            const ay = pointA[1]
            const bx = pointB[0]
            const by = pointB[1]
            if (ax != bx && ay != by) {
                
                if (grid[ax+'+'+by] && grid[bx+'+'+ay]) {
                    // console.log(ax+'+'+by, bx+'+'+ay)
                    const area = Math.abs(by-ay)*Math.abs(bx-ax)
                    res = Math.min(res, area)
                }
            }
        }
    }
    return res == Number.MAX_SAFE_INTEGER ? 0 : res
~~~
### 删除字符串中的所有相邻重复项
~~~
leetcode 1209
function deleteRepeated(s, k) {
    const stack = []
    for (let i = 0; i < s.length; i++) {
        const pre = stack.pop()
        if (!pre || pre[0] != s[i]) {
            stack.push(pre)
            stack.push(s[i])
        } else if (pre.length < k-1) {
            stack.push(pre+s[i])
        }
    }
    return stack.join('')
}
~~~
### z字型变换
~~~
leetcode 6
function zTransformation(s, numRows) {
    const list = new Array(numRows).fill('')
    const m = 2*numRows-2
    for (let i = 0 ; i <  s.length; i++) {
        const x = i%m
        const row = Math.min(x, m-x)
        list[row] += s[i]
    }
    return list.join('')
}
~~~