import React from "react"
import {ContactsType, CurrentProfileType} from "typings/types";
import {useAppDispatch} from "redux/reduxStore";
import { sendProfileDataOnServ } from "redux/profileReducer";
import { Button, Checkbox, Form, Input, Radio } from 'antd';
import SocialMediaImage from "components/SocialMediaImage";
import { InstagramOutlined, GithubOutlined, YuqueOutlined, QuestionOutlined} from '@ant-design/icons';
import VkontakteSvg from "components/VkontakteSVG";


type PropsDataType = {
    changeEditMode: (type:boolean) => void
    currentProfile: CurrentProfileType
}
type PropsFormDataType = {
}


const ProfileContactsInput: React.FC<PropsDataType> = ({currentProfile,  changeEditMode}) => {

    const dispatch = useAppDispatch()
    const [form] = Form.useForm()


    /*// Use form inside UseEffect
    useEffect(() => {
        form.setFieldsValue({
            username: 'Annacoding',
        });
    }, [form]);*/

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
                {!hidden && <SocialMediaImage image={image}/>}
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
                            <Button htmlType="submit" type="primary" ghost style={{width:"100px"}}>Submit</Button>
                        </Form.Item>
                        <Button onClick={() => changeEditMode(false)} type="primary" ghost style={{width:"100px"}}>Cancel</Button>
                    </div>
                </Form>

            </>
        )

}

export default ProfileContactsInput