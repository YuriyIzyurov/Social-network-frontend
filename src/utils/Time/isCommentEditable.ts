
export const isCommentEditable = (date: string) => {
    if(date) {
        const isBeingOnlineDateLimit = 500000
        const dateDifference = Date.now() - Date.parse(date)
        return dateDifference < isBeingOnlineDateLimit
    } else {
        return false
    }
}