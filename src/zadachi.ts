


const fill = (height:number[]) => {
    let result = 0
    function getMaxOfArray(a:number[]) {
        return Math.max.apply(null, a);
    }
    for(let i = 1; i < height.length - 1; i++){
        let leftDifference = []
        let rightDifference = []
        let maxLeftPart = 0
        let maxRightPart = 0
        for(let j = 0; j < i; j++){
            if(height[j] - height[i] > 0){
                leftDifference.push(height[j] - height[i])
            }
        }
        for(let j = i + 1; j < height.length; j++){
            if(height[j] - height[i] > 0){
                rightDifference.push(height[j] - height[i])
            }
        }
        if(leftDifference.length > 0) {
            maxLeftPart = getMaxOfArray(leftDifference)
        } else maxLeftPart = 0
        if(rightDifference.length > 0) {
            maxRightPart = getMaxOfArray(rightDifference)
        } else maxRightPart = 0

        result = result + Math.min(maxLeftPart, maxRightPart)
    }
    return result
}


export default fill