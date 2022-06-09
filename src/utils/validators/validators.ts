export const required = (value:number) => {
    return value  ? undefined : 'Required'
}

const maxLength = (max:number) => (value:string) =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
export const maxLength200 = maxLength(200)
export const maxLength30 = maxLength(30)

export const minLength = (min:number) => (value:string) =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)

