import React from 'react';
import axios from 'axios'
import { Link } from 'react-router';
import { URL_FOR_SERVICES } from '../config.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class AllServices extends React.Component {

    constructor (props) {
        super(props)
        this.state = { services: [], dialogOpen: false, serviceToDelete: null, nameOfServiceToDelete: null}

        this.userID = localStorage.getItem('_id')
        this.getServices = this.getServices.bind(this)
        this.renderServices = this.renderServices.bind(this)
        this.handleDeleteService = this.handleDeleteService.bind(this)
        this.renderActions = this.renderActions.bind(this)
        this.handleDeletePress = this.handleDeletePress.bind(this)
    }
    
    componentWillMount() {
        this.getServices() // Get Services data to display
    }

    getServices() {
        const data = { userID: localStorage.getItem('_id') }
        axios.post('services/all/', data)
        .then((res) => this.setState({ services: res.data }))
    }

    renderServices() {
        let services = this.state.services.map((service) => {
            return (
                <tr key={service._id}>
                    <td>{service.name}</td>
                    <td>{service.email}</td>
                    <td><span onClick={() => this.handleDeletePress(service._id, service.name)} className='remove glyphicon glyphicon-trash'></span></td>
                    <td><Link to={'/dashboard/edit-service/' + service._id} className='edit glyphicon glyphicon-edit'></Link></td>
                </tr>
            )
        })
        return services
    }
    
    handleDeletePress(id, name) {
        this.setState({dialogOpen: true, serviceToDelete: id, nameOfServiceToDelete: name})
    }

    handleDeleteService(id) {
        axios.delete(URL_FOR_SERVICES + '/one/' + id)
        .then((res) => {
            this.getServices()
            this.setState({dialogOpen: false})
        })
    }
    
    renderActions () {
        return(
        <div>
            <FlatButton label="Cancel" primary={true} onTouchTap={() => this.setState({dialogOpen: false})} />
            <FlatButton label="Delete" secondary={true} onTouchTap={() => this.handleDeleteService(this.state.serviceToDelete)} />
        </div>
        )
    }

    render(){
        return (
        <div className="row">
            <div className="col-xs-7">
                <h3>Services <Link to={'/dashboard/new-service'} className='new-link'><i className='glyphicon glyphicon-plus'></i> New Service</Link></h3>
                <br/>
                <table className="table table-hover">
                    <tbody>
                        {this.renderServices()}
                    </tbody>
                </table>
            </div>
            
            <MuiThemeProvider>
            <Dialog modal={false} actions={this.renderActions()} open={this.state.dialogOpen} onRequestClose={() => this.setState({dialogOpen: false})}>
                <p>Delete Service: {this.state.nameOfServiceToDelete} ? </p>
            </Dialog>
            </MuiThemeProvider>
        </div>
        );
    }
}
