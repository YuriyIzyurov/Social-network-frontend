import React from "react"
import s from './ProfileInfo.module.css'


class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }

    changeEditMode(){
         this.setState({editMode: !this.state.editMode})
    }

    render() {
        return <div>
            <div>
                {!this.state.editMode && <span onDoubleClick={this.changeEditMode.bind(this)}>{this.props.status}</span>}
            </div>
            <div>
                {this.state.editMode && <input autoFocus={true} onBlur={this.changeEditMode.bind(this)} value={this.props.status}/>}
            </div>
        </div>
    }
}

export default ProfileStatus