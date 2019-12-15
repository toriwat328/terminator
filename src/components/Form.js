import React from 'react'

class Form extends React.Component {

    constructor() {
        super()
        this.state = {
            id: null,
            title: '',
            description: '',
            projectid: null,
            datefound: '',
            screenshot: '',
            isresolved: false,
            solution: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) => {
        this.setState({[e.target.id] : e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('hello');
        if(this.props.view.page === 'addIssue') {
            this.props.handleCreate(this.state)
        } else if(this.props.view.page === 'editIssue') {
            this.props.handleUpdate(this.state)
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.formInputs.id,
            title: this.props.formInputs.title,
            description: this.props.formInputs.description,
            projectid: this.props.formInputs.projectid,
            datefound: this.props.formInputs.datefound,
            screenshot: this.props.formInputs.screenshot,
            isresolved: this.props.formInputs.isresolved,
            solution: this.props.formInputs.solution,
        })
    }


    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Title
                    <input type="text" placeholder="Title" id="bugTitle"
                     onChange={this.handleChange}/>
                </label>
                <label>
                    Description
                    <input type="text" ref={this.input} placeholder="Description" id="bugDescription"
                    onChange={this.handleChange}/>
                </label>
                <label>
                    Date Found
                    <input type="text" placeholder="Date Found" id="bugDateFound"
                    onChange={this.handleChange}/>
                </label>
                <label>
                    Screenshot
                    <input type="text" placeholder="Screenshot" id="bugScreenshot"
                    onChange={this.handleChange}/>
                </label>
                <label>
                    Resolved
                    <input type="text" placeholder="Resolved" id="bugIsResolved"
                    onChange={this.handleChange}/>
                </label>
                <label>
                    Solution
                    <input type="text" placeholder="Solution" id="bugSolution"
                    onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Log Bug"/>
            </form>
        )
    }
}

export default Form
