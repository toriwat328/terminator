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

            }
        }
    }

    handleView = (view, projectData) => {
        let pageTitle = ''
        let formInputsProjects = {
            id: null,
            name: '',
            start: '',
            deadline: '',
            language: ''
        }
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
                break
            case 'addIssue':
                pageTitle = 'Record New Bug'
                break
            case 'editIssue':
                pageTitle = 'Update Bug Issue'
                break
            default:
                break
            }

            this.setState({
                view: {
                    page: view,
                    pageTitle: pageTitle
                },
                formInputsProjects: formInputsProjects
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
                    />
                </div>
            </div>
        )
    }
}

export default App
