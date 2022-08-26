import { Button, Modal } from 'antd';
import React, {Dispatch, SetStateAction, useState} from 'react';


type PropsType = {
    visible:boolean
    setVisible: Dispatch<SetStateAction<boolean>>
}
const ModalCloseDialog: React.FC<PropsType> = ({visible, setVisible}) => {

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');


    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <>
            <Modal
                title="Title"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={400}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
};

export default ModalCloseDialog;