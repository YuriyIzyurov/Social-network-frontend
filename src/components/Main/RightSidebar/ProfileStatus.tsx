import React, {useEffect, useState} from "react"

type PropsType = {
    status: string
    updateStatus:(localStatus:string) => void
    currentProfile:number
    authID:number|null
}

export const ProfileStatus:React.FC<PropsType> = ({status, updateStatus,currentProfile, authID}) => {

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
            {currentProfile === authID
                ?
                <>
                <div className='profile-status'>
                    {!editMode && <span onDoubleClick={() => setState(true)}>{status || "Установить статус"}</span>}
                </div>
                <div className='input-status'>
                    {editMode &&
                        <input placeholder='Введите статус' onChange={updateLocalStatus} onBlur={updateStatusOnServ}
                               autoFocus={true} value={localStatus}/>}
                </div>
            </>
            :
                <div className='profile-status-notMe'>
                    <span>{status}</span>
                </div>
            }
        </div>
    )
}
