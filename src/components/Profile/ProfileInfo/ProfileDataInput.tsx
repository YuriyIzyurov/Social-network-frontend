import React from "react"
import s from './ProfileInfo.module.css'
import style from "./../../../common/FormsControl/Textarea.module.css"
import {Field, reduxForm} from "redux-form";
import {Input} from "../../../common/FormsControl/Textarea";
import {maxLength200, maxLength30, required} from "../../../utils/validators/validators";
import {CurrentProfileType} from "../../../typings/types";

type PropsType = {
    currentProfile: CurrentProfileType
    sendProfileDataOnServ: (formData?: any) => any
    changeEditMode: (type:boolean) => void
}

const ProfileDataInput: React.FC<PropsType> = ({currentProfile, sendProfileDataOnServ, changeEditMode}) => {
    /*const [checked, setChecked] = useState(false)
    const handleChange = () => setChecked(!checked)*/
    const sendData = (formData:any) => {
         sendProfileDataOnServ(formData)
             .then(() => changeEditMode(false))


    }
    const Contact: React.FC<{socialMedia:string}> = ({socialMedia}) => {
        return <div className={s.descriptionBlock}>
            <b>{socialMedia}:</b><Field placeholder={socialMedia} component={Input} validate={[maxLength200]}
                                        name={"contacts." + socialMedia}/>
        </div>
    }

    const ProfileDataInputForm: React.FC<{handleSubmit:any, error?:string }> = ({handleSubmit, error}) => {
        return <form onSubmit={handleSubmit}>
            <div className={s.descriptionBlock}>
                <span>{currentProfile.fullName}</span><Field  placeholder={"nickname"} component={Input}
                                                             validate={[required, maxLength30]} name={"fullName"}/>
            </div>
            <div className={s.descriptionBlock}>
                <b>About me:</b><Field placeholder={"some words about me"} component={Input} validate={[maxLength200]}
                                       name={"aboutMe"} />
            </div>
            <div>
                <b>Looking for a job:</b> <Field component="input"
                                                 type={"checkbox"} name={"lookingForAJob"}/>
            </div>
            <div className={s.descriptionBlock}>
                <div><b>Looking for a job description:</b><Field placeholder={"my skills"} component={Input} validate={[maxLength200]}
                                                                             name={"lookingForAJobDescription"}/></div>
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(currentProfile.contacts).map(key => {
                return <Contact key={key} socialMedia={key} /*contactValue={currentProfile.contacts[key]}*//>
            })}
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
            {error && <div className={style.error}>
                {error}
            </div>}
        </form>
    }


    const ProfileDataInputFormRedux = reduxForm(
        {
            form: 'ProfileInfo',
            enableReinitialize: true,
            destroyOnUnmount: false
        }
    )(ProfileDataInputForm as any)

    return <ProfileDataInputFormRedux initialValues={currentProfile} onSubmit={sendData}/>
}

export default ProfileDataInput