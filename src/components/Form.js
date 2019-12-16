import React from 'react'

class Form extends React.Component {

    constructor() {
        super()
        this.state = {
            projects: {
                id: null,
                name: '',
                start: '',
                deadline: '',
                language: ''
            },
            bugs: {
                id: null,
                title: '',
                description: '',
                projectid: null,
                datefound: '',
                screenshot: '',
                isresolved: false,
                solution: ''
            }

        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state);
        if(this.props.view.page === 'addProject') {
            this.props.handleCreate(this.state.projects)
        } else if(this.props.view.page === 'editProject') {
            this.props.handleUpdate(this.state.projects)
        } else if(this.props.view.page === 'addBug'){
            this.props.handleCreate(this.state.bugs)
        } else if(this.props.view.page === 'editBug'){
            this.props.handleUpdate(this.state.bugs)
        }
    }

    componentDidMount() {
        this.setState({
            projects: {
                id: this.props.formInputsProjects.id,
                name: this.props.formInputsProjects.name,
                start: this.props.formInputsProjects.start,
                deadline: this.props.formInputsProjects.deadline,
                language: this.props.formInputsProjects.language
            },
            bugs: {
                id: this.props.formInputsBugs.id,
                title: this.props.formInputsBugs.title,
                description: this.props.formInputsBugs.description,
                projectid: this.props.formInputsBugs.projectid,
                datefound: this.props.formInputsBugs.datefound,
                screenshot: this.props.formInputsBugs.screenshot,
                isresolved: this.props.formInputsBugs.isresolved,
                solution: this.props.formInputsBugs.solution
            }


        })
    }


    render () {
        return (

            <div>
                {this.props.view.page === 'addProject' || this.props.view.page === 'editProject' ?

                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name
                            <input type="text" placeholder="Name" id="name" defaultValue={this.state.projects.name} name="projectName"
                             onChange={this.handleChange}/>
                        </label>
                        <label>
                            Start
                            <input type="text" placeholder="Start" id="start" defaultValue={this.state.projects.start} name="projectStart"
                            onChange={this.handleChange}/>
                        </label>
                        <label>
                            Deadline
                            <input type="text" placeholder="Deadline" id="deadline" defaultValue={this.state.projects.deadline} name="projectDeadline"
                            onChange={this.handleChange}/>
                        </label>
                        <label>
                            Language
                            <input type="text" placeholder="Language" id="language" defaultValue={this.state.projects.language} name="projectLanguage"
                            onChange={this.handleChange}/>
                        </label>
                        <input type="submit"
                        value="Create Project"/>
                    </form>

                    : this.props.view.page === 'addBug' || this.props.view.page === 'editBug' ?

                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Title
                            <input type="text" placeholder="Title" id="title" defaultValue={this.state.bugs.title} name="bugTitle"
                             onChange={this.handleChange}/>
                        </label>
                        <label>
                            Description
                            <input type="text" placeholder="Description" id="description" defaultValue={this.state.bugs.description} name="bugDescription"
                             onChange={this.handleChange}/>
                        </label>
                        <label>
                            Project ID
                            <input type="text" placeholder="Project ID" id="projectid" defaultValue={this.state.bugs.projectid} name="bugProjectID"
                             onChange={this.handleChange}/>
                        </label>
                        <label>
                            Date Found
                            <input type="text" placeholder="Date Found" id="datefound" defaultValue={this.state.bugs.datefound} name="bugDateFound"
                             onChange={this.handleChange}/>
                        </label>
                        <label>
                            Screenshot
                            <input type="text" placeholder="Screenshot" id="screenshot" defaultValue={this.state.bugs.screenshot} name="bugScreenshot"
                             onChange={this.handleChange}/>
                        </label>
                        <label>
                            is This Issue Resolved?
                            <input type="text" placeholder="Resolved?" id="isresolved" defaultValue={this.state.bugs.isresolved} name="bugIsResolved"
                             onChange={this.handleChange}/>
                        </label>
                        <label>
                            Solution
                            <input type="text" placeholder="Solution" id="solution" defaultValue={this.state.bugs.solution} name="bugSolution"
                             onChange={this.handleChange}/>
                        </label>
                        <input type="submit"
                        value="Create Issue"/>
                    </form> :
                    ''
                }

            </div>



        )
    }
}

export default Form
