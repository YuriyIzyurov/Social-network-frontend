import React from "react"
import s from './ProfileInfo.module.css'


class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    changeEditMode = () => {
         this.setState({editMode: !this.state.editMode})
         this.props.updateMyStatus(this.state.status)

    }
    updateLocalState = (onChange) => {
        this.setState({status: onChange.target.value})
    }

    render() {
        return <div>
            <div>
                {!this.state.editMode && <span onDoubleClick={this.changeEditMode}>{this.props.status}</span>}
            </div>
            <div>
                {this.state.editMode && <input onChange={this.updateLocalState} autoFocus={true} onBlur={this.changeEditMode} value={this.state.status}/>}
            </div>
        </div>
    }
}

export default ProfileStatus