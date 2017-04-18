import React from 'react';
import axios from 'axios'
import { URL_FOR_CUSTOMERS } from '../config.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

export default class EditCustomer extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { name: '', email: '', company: '', country: '', city: '', telephone: '', mobile: '', userID: localStorage.getItem('_id') }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleResponse = this.handleResponse.bind(this)
        this.getCustomer = this.getCustomer.bind(this)
    }
    
    componentWillMount() {
        this.getCustomer()
    }
    
    getCustomer() {
        const data = { _id: this.props.params.customerID }
        axios.post(URL_FOR_CUSTOMERS + '/one', data)
        .then((res) => this.setState(res.data))
    }

    handleChange(name) {
        if (name === 'include') return(e) => this.setState({[name]: !this.state.include})
        if (name === 'featured') return(e) => this.setState({[name]: !this.state.featured})
        return(e) => this.setState({[name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()
        axios.post(URL_FOR_CUSTOMERS + '/update/' + this.props.params.customerID, this.state)
        .then((res) => this.handleResponse(res.data))
    }

    handleResponse(data) {
        if (data.errors) alert(data.message)
        if (!data.errors) location.href = '#/dashboard/customers'
    }

    render(){
        return (
        <div className='row'>
            <form onSubmit={this.handleSubmit}>
            <div className="col-md-6">
            <h3>Edit Customer</h3>

                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Name'} value={this.state.name} onChange={this.handleChange("name")} required={true}/>
                </MuiThemeProvider>
                <br/>

                <MuiThemeProvider>
                <TextField type={'email'} fullWidth={true} floatingLabelText={'Email'} value={this.state.email} onChange={this.handleChange("email")} />
                </MuiThemeProvider>
                <br/>
                
                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Company'} value={this.state.company} onChange={this.handleChange("company")} />
                </MuiThemeProvider>
                <br/>
                
                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Country'} value={this.state.country} onChange={this.handleChange("country")} />
                </MuiThemeProvider>
                <br/>

                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'City'} value={this.state.city} onChange={this.handleChange("city")} />
                </MuiThemeProvider>
                <br/>

                <MuiThemeProvider>
                <TextField type={'number'} fullWidth={true} floatingLabelText={'Telephone'} value={this.state.telephone} onChange={this.handleChange("telephone")} />
                </MuiThemeProvider>
                <br/>
                
                <MuiThemeProvider>
                <TextField type={'number'} fullWidth={true} floatingLabelText={'Mobile'} value={this.state.mobile} onChange={this.handleChange("mobile")} />
                </MuiThemeProvider>
                <br/>
            
                <br/><br/>
                <MuiThemeProvider>
                <RaisedButton type="submit" className="button yellow-btn" label="Submit" primary={true}/>
                </MuiThemeProvider>
            </div>

            <div className="col-md-offset-1 col-md-5">
                <br/><br/><br/>
                {/*<MuiThemeProvider>
                <Checkbox label={'Check if you want to include this destination in website'} checked={this.state.include} onCheck={this.handleChange("include")}/>
                </MuiThemeProvider>*/}

            </div>
            </form>
        </div>
        );
    }
}
