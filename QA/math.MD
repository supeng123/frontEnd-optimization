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