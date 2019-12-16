import React from 'react'
import Projects from './Projects.js'
import Form from './Form.js'
import ProjectDetails from './ProjectDetails.js'
import BugDetails from './BugDetails.js'

let baseUrl = '';
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:8888'
} else {
    console.log('this is for heroku');
}

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            bugs: [],
            projectShow: [],
            bugShow: []
        }
    }

    fetchProjects = () => {
        fetch(`${baseUrl}/projects`)
        .then(data=>data.json())
        .then(jData=> {
            this.setState({projects:jData})
        }).catch(err=>console.log(err))
    }

    handleCreate = (createProject) => {
        console.log('this is handleCreate');
        fetch(`${baseUrl}/projects`, {
            body: JSON.stringify(createProject),
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then(createdProject => {
            return createdProject.json()
        })
        .then(jsonedProject => {
            this.props.handleView('home')
            this.setState(prevState => {
                prevState.projects = jsonedProject
                return { projects: prevState.projects}
            })
        })
        .catch(err => console.log(err))
    }

    handleCreateBug = (createBug) => {
        fetch(`${baseUrl}/issues`, {
            body: JSON.stringify(createBug),
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then(createdBug => {
            console.log('bug created');
            return createdBug.json()
        })
        .then(jsonedBugs => {
            this.props.handleView('home')
            this.setState(prevState => {
                prevState.bugs = jsonedBugs
                return { bugs: prevState.bugs}
            })
        })
        .catch(err => console.log(err))
    }

    handleUpdate = (projectUpdate) => {
        fetch(`${baseUrl}/projects/${projectUpdate.id}`, {
            body: JSON.stringify(projectUpdate),
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(updatedProject => {
                this.props.handleView('home')
                this.fetchProjects()
            })
    }

    deleteProject = (id) => {
        fetch(`${baseUrl}/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(json => {
                this.setState(prevState => {
                    const projects = prevState.projects.filter(project => project.id !== id)
                    return { projects }
                })
            })
            .catch(err => console.log(err))
    }

    showProject = (project) => {
        fetch(`${baseUrl}/projects/${project.id}`)
        .then(data=> data.json())
        .then(showjData=> {
            this.setState({
                projectShow: showjData
            }, () => {
                this.props.handleView('showProject');
                console.log(this.state.projectShow);
            })
        }).catch(err=>console.log(err))

    }

    showBug = (bug) => {
        fetch(`${baseUrl}/issues/${bug.id}`)
        .then(data=> data.json())
        .then(showBugjData=> {
            this.setState({
                bugShow: showBugjData
            }, () => {
                this.props.handleView('showBug');
                console.log(this.state.bugShow);
            })
        }).catch(err=>console.log(err))

    }


    componentDidMount() {
        this.fetchProjects()
    }


    render () {
        return (
            <main>
                <h1>{this.props.view.pageTitle}</h1>




                { this.props.view.page === 'home'
                    ? this.state.projects.map((projectData) => (
                        <Projects
                            key={projectData.id}
                            projectData={projectData}
                            handleView={this.props.handleView}
                            deleteProject={this.deleteProject}
                            showProject={this.showProject}

                        />
                    )): this.props.view.page === 'showProject' ?
                    <ProjectDetails  showData={this.state.projectShow} handleView={this.props.handleView} showBug={this.showBug} />
                    : this.props.view.page === 'showBug' ?
                    <BugDetails showBugData={this.state.bugShow} handleView={this.props.handleView}/>


                    : <Form
                        handleCreate={this.handleCreate}
                        handleUpdate={this.handleUpdate}
                        formInputsProjects={this.props.formInputsProjects}
                        formInputsBugs={this.props.formInputsBugs}
                        view={this.props.view}
                    />
                }
            </main>
        )
    }
}

export default Main
