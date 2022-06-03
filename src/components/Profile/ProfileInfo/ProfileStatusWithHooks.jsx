import React, {useState} from "react"
import s from './ProfileInfo.module.css'

const ProfileStatusWithHooks = (props) => {
    let [editMode, setState ] = useState(false)
    let [status, setStatus ] = useState(props.status)

    const updateLocalStatus = (onChange) => {
        setStatus(onChange.target.value)
    }
    const updateStatusOnServ = () => {
        setState(false)
        props.updateMyStatus(status)
    }

    return <div>
        <div>
            {!editMode && <span onDoubleClick={() => setState(true)}>{props.status || "no status"}</span>}
        </div>
        <div>
            {editMode && <input onChange={updateLocalStatus} autoFocus={true} onBlur={updateStatusOnServ} value={status}/>}
        </div>
    </div>
}

export default ProfileStatusWithHooks