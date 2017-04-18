import React from 'react';
import axios from 'axios'
import { Link } from 'react-router';
import { URL_FOR_CUSTOMERS } from '../config.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class AllCustomers extends React.Component {

    constructor (props) {
        super(props)
        this.state = { customers: [], dialogOpen: false, customerToDelete: null, nameOfCustomerToDelete: null}

        this.userID = localStorage.getItem('_id')
        this.getCustomers = this.getCustomers.bind(this)
        this.renderCustomers = this.renderCustomers.bind(this)
        this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this)
        this.renderActions = this.renderActions.bind(this)
        this.handleDeletePress = this.handleDeletePress.bind(this)
    }
    
    componentWillMount() {
        this.getCustomers() // Get customers data to display
    }

    getCustomers() {
        const data = { userID: localStorage.getItem('_id') }
        axios.post('customers/all/', data)
        .then((res) => this.setState({ customers: res.data }))
    }

    renderCustomers() {
        let customers = this.state.customers.map((customer) => {
            return (
                <tr key={customer._id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td><span onClick={() => this.handleDeletePress(customer._id, customer.name)} className='remove glyphicon glyphicon-trash'></span></td>
                    <td><Link to={'/dashboard/edit-customer/' + customer._id} className='edit glyphicon glyphicon-edit'></Link></td>
                </tr>
            )
        })
        return customers
    }

    handleDeletePress(id, name) {
        this.setState({dialogOpen: true, customerToDelete: id, nameOfCustomerToDelete: name})
    }

    handleDeleteCustomer(id) {
        axios.delete(URL_FOR_CUSTOMERS + '/one/' + id)
        .then((res) => {
            this.getCustomers()
            this.setState({dialogOpen: false})
        })
    }
    
    renderActions () {
        return(
        <div>
            <FlatButton label="Cancel" primary={true} onTouchTap={() => this.setState({dialogOpen: false})} />
            <FlatButton label="Delete" secondary={true} onTouchTap={() => this.handleDeleteCustomer(this.state.customerToDelete)} />
        </div>
        )
    }
    
    render(){
        return (
        <div className="row">
            <div className="col-xs-7">
                <h3>Customers <Link to={'/dashboard/new-customer'} className='new-link'><i className='glyphicon glyphicon-plus'></i> New Customer</Link></h3>
                <br/>
                <table className="table table-hover">
                    <tbody>
                        {this.renderCustomers()}
                    </tbody>
                </table>
            </div>
            
            <MuiThemeProvider>
            <Dialog modal={false} actions={this.renderActions()} open={this.state.dialogOpen} onRequestClose={() => this.setState({dialogOpen: false})}>
                <p>Delete Customer: {this.state.nameOfCustomerToDelete} ? </p>
            </Dialog>
            </MuiThemeProvider>        
        </div>
        );
    }
}
