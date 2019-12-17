import React from 'react'
import Bugs from './Bugs.js'
import Form from './Form.js'

let baseUrl = '';
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:8888/'
} else {
    baseUrl = 'https://bug-terminator-api.herokuapp.com/api';
}

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bugs: []
        }
    }

    fetchBugs = () => {
        fetch(`${baseUrl}/issues`)
        .then(data=>data.json())
        .then(jData=> {
            this.setState({bugs:jData})
        }).catch(err=>console.log(err))
    }

    handleCreate = (createBug) => {
        console.log('this is handleCreate');
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
        .then(jsonedBug => {
            this.props.handleView('home')
            this.setState(prevState => {
                prevState.bugs = jsonedBug
                return { bugs: prevState.bugs}
            })
        })
        .catch(err => console.log(err))
    }

    handleUpdate = (bugUpdate) => {
        fetch(`${baseUrl}/issues/${bugUpdate.id}`, {
            body: JSON.stringify(bugUpdate),
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(updatedBug => {
                this.props.handleView('home')
                this.fetchBugs()
            })
    }

    deleteBug = (id) => {
        fetch(`${baseUrl}/issues/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(json => {
                this.setState(prevState => {
                    const bugs = prevState.bugs.filter(bug => bug.id !== id)
                    return { bugs }
                })
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.fetchBugs()
    }


    render () {
        return (
            <main>
                <h2>{this.props.view.pageTitle}</h2>

                { this.props.view.page === 'home'
                    ? this.state.bugs.map((bugData) => (
                        <Bugs
                            key={bugData.id}
                            bugData={bugData}
                            handleView={this.props.handleView}
                            deleteBug={this.deleteBug}
                        />
                    ))
                    : <Form
                        handleCreate={this.handleCreate}
                        handleUpdate={this.handleUpdate}
                        formInputs={this.props.formInputs}
                        view={this.props.view}
                    />
                }
            </main>
        )
    }
}

export default Main
