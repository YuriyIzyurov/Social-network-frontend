import React, {useEffect, useState} from 'react';
import './EditSettings.scss'
import {Popover, Tooltip} from "antd";
import {CheckOutlined, CloseOutlined, DeleteOutlined, FormOutlined} from "@ant-design/icons";
import {deletePublication} from "../../redux/postsReducer";
import {useAppDispatch} from "../../redux/reduxStore";

type PropsType = {
    editPost: () => void
    id: string
    handleTooltipVisibility: (boolean: boolean) => void
}
const EditSettings:React.FC<PropsType> = ({editPost, id, handleTooltipVisibility}) => {

    const [visible, setVisible] = useState(false)
    const [visibleEditTooltip, setVisibleEditTooltip] = useState(false)
    const [visibleDeleteTooltip, setVisibleDeleteTooltip] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(visible || visibleEditTooltip || visibleDeleteTooltip) {
            handleTooltipVisibility(true)
        } else handleTooltipVisibility(false)
    },[visible, visibleEditTooltip, visibleDeleteTooltip])

    const handleVisibleChange = (newVisible: boolean) => {
        setVisibleDeleteTooltip(false)
        setVisible(newVisible)
    }
    const hide = () => {
        setVisible(false)
    }
    const showEditTooltip = (newVisible: boolean) => {
        if(!visible) setVisibleEditTooltip(newVisible)
    }
    const showDeleteTooltip = (newVisible: boolean) => {
        if(!visible) setVisibleDeleteTooltip(newVisible)
    }
    const sendDeleteDataOnServ = () => {
        dispatch(deletePublication(id))
    }

    return (
        <>
            <div className="edit">
                <Tooltip mouseLeaveDelay={0.05}
                         mouseEnterDelay={0.3}
                         visible={visibleEditTooltip}
                         onVisibleChange={showEditTooltip}
                         title="Редактировать пост"
                >
                    <FormOutlined onClick={editPost}/>
                </Tooltip>
                <Tooltip mouseLeaveDelay={0.05}
                         mouseEnterDelay={0.3}
                         visible={visibleDeleteTooltip}
                         onVisibleChange={showDeleteTooltip}
                         title="Удалить пост">
                    <Popover
                        content={
                            <div className="popover-options">
                                <div>
                                    <CheckOutlined style={{color: '#39e324'}}/>
                                    <a onClick={sendDeleteDataOnServ}>Да</a>
                                </div>
                                <div>
                                    <CloseOutlined style={{color: 'red'}}/>
                                    <a onClick={hide}>Нет</a>
                                </div>
                            </div>
                        }
                        title="Вы действительно хотите удалить пост?"
                        trigger="click"
                        visible={visible}
                        onVisibleChange={handleVisibleChange}
                        color={"#2c2f48"}
                        overlayClassName="custom-popover"
                    >
                        <DeleteOutlined  style={{color: 'red'}}/>
                    </Popover>
                </Tooltip>
            </div>
        </>
    );
};

export default EditSettings;