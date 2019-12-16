import React from 'react';
import Header from './components/Header.js'
import Aside from './components/Aside.js'
import Main from './components/Main.js'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            view: {
                page: 'home',
                pageTitle: 'Project Log'
            },
            formInputsProjects: {
                id: null,
                name: null,
                start: null,
                deadline: null,
                language: null,

            },
            formInputsBugs: {
                id: null,
                title: null,
                description: null,
                projectid: null,
                datefound: null,
                screenshot: null,
                isresolved: false,
                solution: null
            }
        }
    }

    handleView = (view, projectData, bugData) => {
        console.log(projectData);
        let pageTitle = ''
        let formInputsProjects = {
            id: null,
            name: '',
            start: '',
            deadline: '',
            language: ''
        }
        let formInputsBugs = {
            id: null,
            title: '',
            description: '',
            projectid: null,
            datefound: '',
            screenshot: '',
            isresolved: false,
            solution: ''
        }
        console.log(projectData);
        switch(view) {

            case 'home':
                pageTitle = 'Project Log'
                break
            case 'addProject':
                pageTitle = 'Create New Project'
                break
            case 'editProject':
                pageTitle = 'Update Project Details'
                formInputsProjects = {
                    id: projectData.id,
                    name: projectData.title,
                    description: projectData.description,
                    projectid: projectData.projectid,
                    datefound: projectData.datefound
                }
                console.log(formInputsProjects);
                break
            case 'showProject':
                pageTitle = 'Project Details'
                break
            case 'showBug' :
                pageTitle = 'Bug Details'
                break
            case 'addBug':
                pageTitle = 'Record New Bug'
                break
            case 'editBug':
                pageTitle = 'Update Bug Issue'
                formInputsBugs = {
                    id: bugData.id,
                    title: bugData.title,
                    description: bugData.description,
                    projectid: bugData.projectid,
                    datefound: bugData.datefound,
                    screenshot: bugData.screenshot,
                    isresolved: bugData.isresolved,
                    solution: bugData.solution
                }
                break
            default:
                break
            }

            this.setState({
                view: {
                    page: view,
                    pageTitle: pageTitle
                },
                formInputsProjects: formInputsProjects,
                formInputsBugs: formInputsBugs
            })

    }


    render () {
        return (
            <div className="outer-container">
                <Header/>
                <div className="main-container">
                    <Aside handleView={this.handleView}/>
                    <Main
                        view={this.state.view}
                        handleView={this.handleView}
                        formInputsProjects={this.state.formInputsProjects}
                        formInputsBugs={this.state.formInputsBugs}
                    />
                </div>
            </div>
        )
    }
}

export default App
