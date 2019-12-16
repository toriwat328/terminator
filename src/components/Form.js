import React from 'react'

class Form extends React.Component {

    constructor() {
        super()
        this.state = {
                id: null,
                name: '',
                start: '',
                deadline: '',
                language: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state);
        if(this.props.view.page === 'addProject') {
            this.props.handleCreate(this.state)
        } else if(this.props.view.page === 'editProject') {
            this.props.handleUpdate(this.state)
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.formInputsProjects.id,
            name: this.props.formInputsProjects.name,
            start: this.props.formInputsProjects.start,
            deadline: this.props.formInputsProjects.deadline,
            language: this.props.formInputsProjects.language

        })
    }


    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name
                    <input type="text" placeholder="Name" id="projectName" defaultValue={this.state.name} name="name"
                     onChange={this.handleChange}/>
                </label>
                <label>
                    Start
                    <input type="text" placeholder="Start" id="projectStart" defaultValue={this.state.start} name="start"
                    onChange={this.handleChange}/>
                </label>
                <label>
                    Deadline
                    <input type="text" placeholder="Deadline" id="projectDeadline" defaultValue={this.state.deadline} name="deadline"
                    onChange={this.handleChange}/>
                </label>
                <label>
                    Language
                    <input type="text" placeholder="Language" id="projectLanguage" defaultValue={this.state.language} name="language"
                    onChange={this.handleChange}/>
                </label>
                <input type="submit"
                value="Create Project"/>

            </form>
        )
    }
}

export default Form
