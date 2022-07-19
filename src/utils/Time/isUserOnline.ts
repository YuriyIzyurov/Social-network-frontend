
export const isUserOnline = (date: string) => {
    const isBeingOnlineDateLimit = 1200000
    const dateDifference = Date.now() - (Date.parse(date) + 1.08e+7)
    return dateDifference < isBeingOnlineDateLimit
}