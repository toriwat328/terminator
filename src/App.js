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
                pageTitle: 'Bug Log'
            },
            formInputs: {
                id: null,
                title: null,
                description: null,
                projectid: null,
                datefound: null,
                screenshot: null,
                isresolved: null,
                solution: null,

            }
        }
    }

    handleView = (view, bugData) => {
        let pageTitle = ''
        let formInputs = {
            id: null,
            title: '',
            description: '',
            projectid: null,
            datefound: '',
            screenshot: '',
            isresolved: false,
            solution: ''
        }
        switch(view) {
            case 'home':
                pageTitle = 'Bug Log'
                break
            case 'addIssue':
                pageTitle = 'Record New Bug'
                break
            case 'editIssue':
                pageTitle = 'Update Bug Record'
                formInputs = {
                    id: bugData.id,
                    title: bugData.title,
                    description: bugData.description,
                    projectid: bugData.projectid,
                    datefound: bugData.datefound,
                    screenshot: bugData.screenshot,
                    isresolved: bugData.isresolved,
                    solution: bugData.solution,
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
                formInputs: formInputs
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
                        formInputs={this.state.formInputs}
                    />
                </div>
            </div>
        )
    }
}

export default App
