
export const isUserOnline = (date: string) => {
    if(date) {
        const isBeingOnlineDateLimit = 1200000
        const dateDifference = Date.now() - (Date.parse(date) + 1.08e+7)
        return dateDifference < isBeingOnlineDateLimit
    } else {
        return false
    }
}