import React from 'react';
import axios from 'axios'
import { URL_FOR_SERVICES } from '../config.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class NewService extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { name: '', category:'', tax: '', active: true, price: '', priceWithTax: '', userID: localStorage.getItem('_id') }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleResponse = this.handleResponse.bind(this)
        this.getService = this.getService.bind(this)
    }
    
    componentWillMount() {
        this.getService()
    }
    
    getService() {
        const data = {_id: this.props.params.serviceID}
        axios.post(URL_FOR_SERVICES + '/one', data)
        .then((res) => this.setState(res.data))
    }

    handleChange(name) {
        if (name === 'active') return(e) => this.setState({[name]: !this.state.active})
        return(e) => {
            // Select component has e.target.innerText, all others have value
            const value = e.target.innerText || e.target.value 
            this.setState({[name]: value})
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        axios.post(URL_FOR_SERVICES + '/update/' + this.props.params.serviceID, this.state)
        .then((res) => this.handleResponse(res.data))
    }

    handleResponse(data) {
        if (data.errors) alert(data.message)
        if (data.errors) console.log(data)
        if (!data.errors) location.href = '#/dashboard/services'
    }

    render(){
        return (
        <div className='row'>
            <form onSubmit={this.handleSubmit}>
            <div className="col-md-6">
            <h3>Edit Service</h3>

                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Name'} value={this.state.name} onChange={this.handleChange("name")} required={true}/>
                </MuiThemeProvider>                

                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Category'} value={this.state.category} onChange={this.handleChange("category")} required={true}/>
                </MuiThemeProvider>
                
                <MuiThemeProvider>
                <SelectField className="select" fullWidth={true} floatingLabelText="Tax (%)" value={this.state.tax} onChange={this.handleChange("tax")}>
                    <MenuItem value={'0%'} primaryText="0" />
                    <MenuItem value={'16'} primaryText="16" />
                    <MenuItem value={'24'} primaryText="24" />
                </SelectField>
                </MuiThemeProvider>
                
                <MuiThemeProvider>
                <TextField fullWidth={true} type={'number'} floatingLabelText={'Price'} value={this.state.price} onChange={this.handleChange("price")} required={true}/>
                </MuiThemeProvider>
                <br/>
            
                <MuiThemeProvider>
                <TextField fullWidth={true} type={'number'} floatingLabelText={'Price With Tax'} value={this.state.priceWithTax} onChange={this.handleChange("priceWithTax")} required={true}/>
                </MuiThemeProvider>                
                
                <br/><br/>
                <MuiThemeProvider>
                <RaisedButton type="submit" className="button yellow-btn" label="Submit" primary={true}/>
                </MuiThemeProvider>
            </div>

            <div className="col-md-offset-1 col-md-5">
                <br/><br/><br/>
                <MuiThemeProvider>
                <Checkbox label={'Active'} checked={this.state.active} onCheck={this.handleChange("active")}/>
                </MuiThemeProvider>

            </div>
            </form>
        </div>
        );
    }
}
