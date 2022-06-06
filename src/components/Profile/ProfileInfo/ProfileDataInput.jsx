import React, {useRef, useState} from "react"
import s from './ProfileInfo.module.css'
import ProfileStatus from "./ProfileStatus";
import login from "../../Login/Login";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../../common/FormsControl/Textarea";
import {maxLength200, maxLength30, required} from "../../../utils/validators/validators";
import styles from "./../../../common/FormsControl/Textarea.module.css"

const ProfileDataInput = ({currentProfile, sendProfileDataOnServ}) => {
    const [checked, setChecked] = useState(false)
    const handleChange = () => setChecked(!checked)
    const sendData = (formData) => {
        console.log(formData,currentProfile.userId)
         sendProfileDataOnServ(formData, currentProfile.userId)
    }
    const Contact = ({socialMedia, contactValue}) => {
        return <div className={s.descriptionBlock}>
            <b>{socialMedia}:</b><Field placeholder={socialMedia} component={Input} validate={[maxLength200]}
                                        name={socialMedia}/>
        </div>
    }

    const ProfileDataInputForm = ({handleSubmit}) => {
        return <form onSubmit={handleSubmit}>
            <div className={s.descriptionBlock}>
                <span>{currentProfile.fullName}</span><Field placeholder={"nickname"} component={Input}
                                                             validate={[required, maxLength30]} name={"fullName"}/>
            </div>
            <div className={s.descriptionBlock}>
                <b>About me:</b><Field placeholder={"some words about me"} component={Input} validate={[maxLength200]}
                                       name={"AboutMe"} />
            </div>
            <div>
                <b>Looking for a job:</b> <Field component="input" checked={checked} onChange={handleChange}
                                                 type={"checkbox"} name={"lookingForAJob"}/>
            </div>
            <div className={s.descriptionBlock}>
                {checked && <div><b>Looking for a job description:</b><Field placeholder={"my skills"} component={Input} validate={[maxLength200]}
                                                                             name={"lookingForAJobDescription"}/></div>}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(currentProfile.contacts).map(key => {
                return <Contact key={key} socialMedia={key} contactValue={currentProfile.contacts[key]}/>
            })}
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    }

    const ProfileDataInputFormRedux = reduxForm({
        form: 'ProfileInfo'
    })(ProfileDataInputForm)

    return <ProfileDataInputFormRedux onSubmit={sendData}/>
}

export default ProfileDataInput