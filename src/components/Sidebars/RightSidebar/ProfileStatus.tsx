import React, {useEffect, useState} from "react"

type PropsType = {
    status: string
    updateMyStatus:(localStatus:string) => void
}
const ProfileStatus:React.FC<PropsType> = ({status, updateMyStatus}) => {
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
        updateMyStatus(localStatus)
    }

    return <div>
        <div>
            {!editMode && <span onDoubleClick={() => setState(true)}>{status || "no status"}</span>}
        </div>
        <div>
            {editMode && <input onChange={updateLocalStatus} autoFocus={true} onBlur={updateStatusOnServ} value={localStatus}/>}
        </div>
    </div>
}

export default ProfileStatus