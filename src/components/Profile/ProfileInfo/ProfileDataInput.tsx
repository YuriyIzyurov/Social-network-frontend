import React from "react"
import s from './ProfileInfo.module.css'
import style from "./../../../common/FormsControl/Textarea.module.css"
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../../common/FormsControl/Textarea";
import {maxLength200, maxLength30, required} from "../../../utils/validators/validators";
import {ContactsType, CurrentProfileType} from "../../../typings/types";

type PropsDataType = {
    sendProfileDataOnServ: (formData?: any) => any
    changeEditMode: (type:boolean) => void
    currentProfile: CurrentProfileType
}
type PropsFormDataType = {
}


const ProfileDataInput: React.FC<PropsDataType> = ({currentProfile, sendProfileDataOnServ, changeEditMode}) => {

    const sendData = (formData:CurrentProfileType) => {
         sendProfileDataOnServ(formData)
             .then(() => changeEditMode(false))
    }

    const Contact: React.FC<{socialMedia:string, contactValue:string}> = ({socialMedia}) => {
        return <div className={s.descriptionBlock}>
            <b>{socialMedia}:</b><Field placeholder={socialMedia} component={Input} validate={[maxLength200]}
                                        name={"contacts." + socialMedia}/>
        </div>
    }

    const ProfileDataInputForm: React.FC<InjectedFormProps<CurrentProfileType, PropsFormDataType> & PropsFormDataType> = ({handleSubmit, error}) => {
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
                //todo: change key as any
                return <Contact key={key} socialMedia={key} contactValue={currentProfile.contacts[key as any]}/>
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


    const ProfileDataInputFormRedux =  reduxForm<CurrentProfileType,PropsFormDataType >(
        {
            form: 'ProfileInfo',
            enableReinitialize: true,
            destroyOnUnmount: false
        }
    )(ProfileDataInputForm)

    return <ProfileDataInputFormRedux initialValues={currentProfile} onSubmit={sendData}/>
}

export default ProfileDataInput