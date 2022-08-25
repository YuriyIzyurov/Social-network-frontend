import React, {useEffect, useState} from "react"

type PropsType = {
    status: string
    updateStatus:(localStatus:string) => void
}
const ProfileStatus:React.FC<PropsType> = ({status, updateStatus}) => {
    let [editMode, setState ] = useState(false)
    let [localStatus, setLocalStatus ] = useState(status)

    useEffect(() => {
        setLocalStatus(status)
    }, [status])

    const updateLocalStatus = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.target.value)
    }
    const updateStatusOnServ = () => {
        setState(false)
        updateStatus(localStatus)

    }

    return(
        <div className='status-area'>
            <div className='profile-status'>
                {!editMode && <span onDoubleClick={() => setState(true)}>{status || "Установить статус"}</span>}
            </div>
            <div className='input-status'>
                {editMode && <input placeholder='Введите статус' onChange={updateLocalStatus}  onBlur={updateStatusOnServ} autoFocus={true} value={localStatus}/>}
            </div>
        </div>
    )
}

export default ProfileStatus