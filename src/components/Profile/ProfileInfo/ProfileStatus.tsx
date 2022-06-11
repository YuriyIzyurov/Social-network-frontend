import React, {ReactHTMLElement} from "react"
import s from './ProfileInfo.module.css'
// UNUSED COMPONENT FO COMPARE WITH FUNCTIONAL COMPONENT ProfileStatusWithHooks

type PropsType = {
    status: string
    updateMyStatus: (newStatus: string) => void
}
type LocalState = {
    editMode: boolean
    status: string
}
class ProfileStatus extends React.Component<PropsType, LocalState> {
    state = {
        editMode: false,
        status: this.props.status
    }

    changeEditMode = () => {
         this.setState({editMode: !this.state.editMode})
         this.props.updateMyStatus(this.state.status)

    }
    updateLocalState = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.target.value})
    }
    componentDidUpdate(prevProps:PropsType, prevState:LocalState) {

        if(prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    render() {
        return <div>
            <div>
                {!this.state.editMode && <span onDoubleClick={this.changeEditMode}>{this.props.status || "no status"}</span>}
            </div>
            <div>
                {this.state.editMode && <input onChange={this.updateLocalState} autoFocus={true} onBlur={this.changeEditMode} value={this.state.status}/>}
            </div>
        </div>
    }
}

export default ProfileStatus