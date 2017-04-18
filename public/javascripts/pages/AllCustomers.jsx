import React from 'react';
import axios from 'axios'
import { Link } from 'react-router';
import { URL_FOR_CUSTOMERS } from '../config.js'

export default class AllCustomers extends React.Component {

    constructor (props) {
        super(props)
        this.state = { customers: []}

        this.userID = localStorage.getItem('_id')
        this.getCustomers = this.getCustomers.bind(this)
        this.renderCustomers = this.renderCustomers.bind(this)
        this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this)
    }
    
    componentWillMount() {
        this.getCustomers() // Get destinations data to display
    }

    getCustomers() {
        const data = { userID: localStorage.getItem('_id') }
        axios.post('customers/all/', data)
        .then((res) => this.setState({ customers: res.data }))
    }

    renderCustomers() {
        let customers = this.state.customers.map((customer) => {
            return (
                <tr key={customers._id}>
                    <td>{customers.name}</td>
                    <td><span onClick={() => this.handleDeleteDestinationl(customers._id)} className='remove glyphicon glyphicon-trash'></span></td>
                    <td><Link to={'/dashboard/edit-destination/' + customers._id} className='edit glyphicon glyphicon-edit'></Link></td>
                </tr>
            )
        })
        return customers
    }

    handleDeleteCustomer(id) {
        const confirm = window.confirm("Delete customers?")
        if (confirm) axios.delete(URL_FOR_DESTINATIONS + '/one/' + id)
        .then((res) => this.getCustomers())
    }

    render(){
        return (
        <div className="row">
            <div className="col-xs-7">
                <h3>Customers <Link to={'/dashboard/new-destination'} className='new-link'><i className='glyphicon glyphicon-plus'></i> New Destination</Link></h3>
                <br/>
                <table className="table table-hover">
                    <tbody>
                        {this.renderCustomers()}
                    </tbody>
                </table>
            </div>           
        </div>
        );
    }
}
