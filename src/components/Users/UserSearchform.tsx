import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import React from "react";
import {FilterType} from "../../redux/usersReducer";

type PropsType = {
    handlingFilteredUsers: (filter:FilterType) => void
}
type FormType = {
    term: string
    friend: "null" | "true" | "false"
}
const UserSearchForm: React.FC<PropsType> = ({handlingFilteredUsers}) => {

    const validator = (values:FormType) =>{
        const errors = {};
        return errors;
    }
    const searchUsers = (values:FormType, {setSubmitting}: FormikHelpers<FormType>) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true: false
        }

        handlingFilteredUsers(filter)
        setSubmitting(false)
    }

    return <div>
        <Formik
            initialValues={{term: '', friend: "null"}}
            validate={validator}
            onSubmit={searchUsers}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value="null">Поиск по всем</option>
                        <option value="true">Поиск только по друзьям</option>
                        <option value="false">Поиск по всем, кроме друзей</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}
export default UserSearchForm