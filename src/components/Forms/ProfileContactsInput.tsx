import React from "react"
import {CurrentProfileType} from "typings";
import {useAppDispatch} from "redux/reduxStore";
import {sendProfileDataOnServ} from "redux/Reducers";
import {Button, Checkbox, Form, Input} from 'antd';
import {GithubOutlined, InstagramOutlined, QuestionOutlined} from '@ant-design/icons';
import {VkontakteSvg} from "assets/VectorComponents";
import { useSelector } from "react-redux";
import {getContactsErrors} from "redux/Selectors";


type PropsType = {
    changeEditMode: (type:boolean) => void
    currentProfile: CurrentProfileType
}


const ProfileContactsInput: React.FC<PropsType> = ({currentProfile,  changeEditMode}) => {


    const dispatch = useAppDispatch()
    const [form] = Form.useForm()

    const validateMessages = {
        types: {
            url: `Not a valid url`,
        },
    }

    const handleFormSubmit = () => {

        form.validateFields()
            .then((values) => {
                const result = {
                    contacts:{}
                }
                for (let key in values) {
                    if(key.includes('contacts')){
                        // @ts-ignore
                        result.contacts[key.replace('contacts:','')] = values[key]
                    } else {
                        // @ts-ignore
                        result[key] = values[key]
                    }
                }
                dispatch(sendProfileDataOnServ(result as CurrentProfileType))
            })
            .catch((errorInfo) => {
                console.log(errorInfo)
            })
        changeEditMode(false)
    }


    const Contact: React.FC<{socialMedia:string, contactValue:string}> = ({socialMedia, contactValue}) => {

        let hidden = true
        let image
        if(socialMedia === 'instagram'||socialMedia === 'vk'||socialMedia === 'github'){
            hidden = false
        }
        switch(socialMedia){
            case 'instagram':
                image = <InstagramOutlined />
                break
            case 'github':
                image = <GithubOutlined />
                break
            case 'vk':
                image = <VkontakteSvg />
                break
            default:
                image = <QuestionOutlined />
        }
        return (
            <div className='input-media'>
                {!hidden && <div>{image}</div>}
                <Form.Item
                    hidden={hidden}
                    name={'contacts:' + socialMedia}
                    initialValue={contactValue}
                  //  rules={[{ type: 'url' }]}
                >
                    <Input placeholder={socialMedia} />
                </Form.Item>
            </div>
        )

    }

        return (
            <>
                <Form
                    layout='horizontal'
                    form={form}
                    onFinish={handleFormSubmit}
                    validateMessages={validateMessages}

                >
                    <Form.Item hidden label="aboutMe" name={"aboutMe"} initialValue={'empty'}>
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item hidden label="Looking for a job:" name={"lookingForAJob"} initialValue={currentProfile.lookingForAJob}>
                        <Checkbox></Checkbox>
                    </Form.Item>
                    <Form.Item hidden label="Looking for a job description:" name={"lookingForAJobDescription"} initialValue={'empty'}>
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item hidden label="fullName" name={"fullName"} initialValue={currentProfile.fullName}>
                        <Input placeholder="input placeholder" />
                    </Form.Item>

                    {Object.keys(currentProfile.contacts).map(key => {
                    //todo: change key as any
                    return <Contact key={key} socialMedia={key} contactValue={currentProfile.contacts[key as any]}/>})}
                    <div className="contacts-button">
                        <Form.Item>
                            <Button htmlType="submit" type="primary" ghost style={{width:"100px"}}>ОК</Button>
                        </Form.Item>
                        <Button onClick={() => changeEditMode(false)} type="primary" ghost style={{width:"100px"}}>Отмена</Button>
                    </div>
                </Form>

            </>
        )

}

export default ProfileContactsInput