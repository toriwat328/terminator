import React from 'react'

class Form extends React.Component {

    constructor() {
        super()
        this.state = {

                id: null,
                name: '',
                start: '',
                deadline: '',
                language: '',
                project_issue_id: [
                    {
                        id: null,
                        title: '',
                        description: '',
                        projectid: null,
                        datefound: '',
                        screenshot: '',
                        isresolved: false,
                        solution: ''
                    }
                ]


        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        if(this.props.view.page === 'addProject' || this.props.view.page === 'editProject'){
            this.setState({

                [event.target.name]: event.target.value

            })

        } else if(this.props.view.page === 'addBug'){
            this.setState({

                [event.target.name]: event.target.value


            })
        } else if(this.props.view.page === 'editBug'){
            this.setState({

                        [event.target.name]: event.target.value

            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        console.log(this.props.formInputsBugs.project_issue_id[0].id);
        console.log(this.props.formInputsBugs);
        if(this.props.view.page === 'addProject') {
            this.props.handleCreate(this.state)
        } else if(this.props.view.page === 'editProject') {
            this.props.handleUpdate(this.state)
        } else if(this.props.view.page === 'addBug'){
            this.props.handleCreateBug(this.state)
        } else if(this.props.view.page === 'editBug'){
            this.props.handleUpdateBug(this.state, this.props.formInputsBugs.project_issue_id[0].id)
        }
    }

    componentDidMount() {
        this.setState({

            id: this.props.formInputsProjects.id,
            name: this.props.formInputsProjects.name,
            start: this.props.formInputsProjects.start,
            deadline: this.props.formInputsProjects.deadline,
            language: this.props.formInputsProjects.language,
            project_issue_id: [
                {
                    id: this.props.formInputsBugs.id,
                    title: this.props.formInputsBugs.title,
                    description: this.props.formInputsBugs.description,
                    projectid: this.props.formInputsProjects.id,
                    datefound: this.props.formInputsBugs.datefound,
                    screenshot: this.props.formInputsBugs.screenshot,
                    isresolved: this.props.formInputsBugs.isresolved,
                    solution: this.props.formInputsBugs.solution
                }
            ]

        })
    }


    render () {
        return (

            <div>
                {this.props.view.page === 'addProject' || this.props.view.page === 'editProject' ?

                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name
                            <input type="text" placeholder="Name" id="name" defaultValue={this.state.name} name="name"
                             onChange={this.handleChange}/>
                        </label>
                        <label>
                            Start
                            <input type="text" placeholder="Start" id="start" defaultValue={this.state.start} name="start"
                            onChange={this.handleChange}/>
                        </label>
                        <label>
                            Deadline
                            <input type="text" placeholder="Deadline" id="deadline" defaultValue={this.state.deadline} name="deadline"
                            onChange={this.handleChange}/>
                        </label>
                        <label>
                            Language
                            <input type="text" placeholder="Language" id="language" defaultValue={this.state.language} name="language"
                            onChange={this.handleChange}/>
                        </label>
                        <input type="submit"
                        value="Create Project"/>
                    </form>

                    : this.props.view.page === 'addBug' || this.props.view.page === 'editBug' ?

                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Title
                            <input type="text" placeholder="Title" id="title" defaultValue={this.state.project_issue_id[0].title} name="title"
                             onChange={this.handleChange}/>
                        </label>
                        <label>
                            Description
                            <input type="text" placeholder="Description" id="description" defaultValue={this.state.project_issue_id[0].description} name="description"
                             onChange={this.handleChange}/>
                        </label>
                        <label>
                            Project ID
                            <input type="text" placeholder="ProjectID" id="projectid" defaultValue={this.state.project_issue_id[0].projectid} name="projectid"
                             onChange={this.handleChange}/>
                        </label>
                        <label>
                            Date Found
                            <input type="text" placeholder="Date Found" id="datefound" defaultValue={this.state.project_issue_id[0].datefound} name="datefound"
                             onChange={this.handleChange}/>
                        </label>
                        <label>
                            Screenshot
                            <input type="text" placeholder="Screenshot" id="screenshot" defaultValue={this.state.project_issue_id[0].screenshot} name="screenshot"
                             onChange={this.handleChange}/>
                        </label>
                        <label>
                            is This Issue Resolved?
                            <input type="text" placeholder="Resolved?" id="isresolved" defaultValue={this.state.project_issue_id[0].isresolved} name="isresolved"
                             onChange={this.handleChange}/>
                        </label>
                        <label>
                            Solution
                            <input type="text" placeholder="Solution" id="solution" defaultValue={this.state.project_issue_id[0].solution} name="solution"
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
