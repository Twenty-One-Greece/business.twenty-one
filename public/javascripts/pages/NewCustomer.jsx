import React from 'react';
import axios from 'axios'
import { URL_FOR_CUSTOMERS } from '../config.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

export default class NewCustomer extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { name: '', email: '', company: '', country: '', city: '', telephone: '', mobile: '', userID: localStorage.getItem('_id') }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleResponse = this.handleResponse.bind(this)
    }

    handleChange(name) {
        // if (name === 'include') return(e) => this.setState({[name]: !this.state.include})
        return(e) => this.setState({[name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()
        axios.post(URL_FOR_CUSTOMERS + '/new', this.state)
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
            <h3>New Customer</h3>

                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Name'} value={this.state.name} onChange={this.handleChange("name")} required={true}/>
                </MuiThemeProvider>

                <MuiThemeProvider>
                <TextField type={'email'} fullWidth={true} floatingLabelText={'Email'} value={this.state.email} onChange={this.handleChange("email")} />
                </MuiThemeProvider>
                
                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Company'} value={this.state.company} onChange={this.handleChange("company")} />
                </MuiThemeProvider>
                
                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Country'} value={this.state.country} onChange={this.handleChange("country")} />
                </MuiThemeProvider>

                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'City'} value={this.state.city} onChange={this.handleChange("city")} />
                </MuiThemeProvider>

                <MuiThemeProvider>
                <TextField type={'number'} fullWidth={true} floatingLabelText={'Telephone'} value={this.state.telephone} onChange={this.handleChange("telephone")} />
                </MuiThemeProvider>
                
                <MuiThemeProvider>
                <TextField type={'number'} fullWidth={true} floatingLabelText={'Mobile'} value={this.state.mobile} onChange={this.handleChange("mobile")} />
                </MuiThemeProvider>
            
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
