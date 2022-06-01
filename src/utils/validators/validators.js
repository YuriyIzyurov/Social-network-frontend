export const required = (value) => {
    return value  ? undefined : 'Required'
}

const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
export const maxLength200 = maxLength(200)
export const maxLength30 = maxLength(30)

export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)

