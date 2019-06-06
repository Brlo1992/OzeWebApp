import React from 'react'
import { Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import config from "../../Configs/config";
import httpClient from "../../Utils/HttpClient";

export default class NewDevice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.editedDevice.id,
            name: this.props.editedDevice.name,
            desc: this.props.editedDevice.desc,
            address: this.props.editedDevice.address,
            interval: this.props.editedDevice.interval,
            nameAlertVisible: false,
            addressAlertVisible: false,
            intervalAlertVisible: false,
            emptyNameAlertVisible: false,
            emptyAddressAlertVisible: false
        }
    }

    submit = async (event) => {
        event.stopPropagation();

        let data = {
            id: this.state.id,
            name: this.state.name,
            desc: this.state.desc,
            address: this.state.address,
            interval: this.state.interval
        }

        console.log(data);

        await this.updateDevice(data);
    }

    updateDevice = async (data) => {
        let url = config.apiUrl.concat("/".concat("device/update"));

        let request = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        };

        await httpClient.SendWithData(url, request, () => { 
            this.props.getItems()
            this.props.toggleEditDevice();
        });
    }

    reset = (event) => {
        event.stopPropagation();

        this.setState({
            id: this.props.editedDevice.id,
            name: this.props.editedDevice.name,
            desc: this.props.editedDevice.desc,
            address: this.props.editedDevice.address,
            interval: this.props.editedDevice.interval,
            nameAlertVisible: false,
            addressAlertVisible: false,
            intervalAlertVisible: false,
            emptyNameAlertVisible: false,
            emptyAddressAlertVisible: false
        });
    }

    dataNotEmpty =() => {
        if (this.state.name && this.state.address) {
            return true;
        }

        return false;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });

        if (event.target.name === "address") {
            if (this.props.checkAddressExist(event.target.value))
                this.setState({ addressAlertVisible: true });
            else
                this.setState({ addressAlertVisible: false });
            if (!this.props.checkIsNotEmpty(event.target.value))
                this.setState({ emptyAddressAlertVisible: true });
            else
                this.setState({ emptyAddressAlertVisible: false });

        }

        if (event.target.name === "name") {
            if (this.props.checkNameExist(event.target.value))
                this.setState({ nameAlertVisible: true });
            else
                this.setState({ nameAlertVisible: false });
            if (!this.props.checkIsNotEmpty(event.target.value))
                this.setState({ emptyNameAlertVisible: true });
            else
                this.setState({ emptyNameAlertVisible: false });
        }

        if (event.target.name === "interval") {
            if (this.props.checkIntervalIsZero(event.target.value))
                this.setState({ intervalAlertVisible: true });
            else
                this.setState({ intervalAlertVisible: false });
        }
    }

    getSaveButton = () => {
        let addButton = <Button color="success" onClick={event => this.submit(event)} block>Save device</Button>;

        if (this.isDataValid() === false)
            addButton = <Button color="success" disabled onClick={event => this.submit(event)} block>Save device</Button>;

        return addButton;
    }

    isDataValid = () => {
        return !this.state.nameAlertVisible &&
            !this.state.addressAlertVisible && 
            !this.state.intervalAlertVisible &&
            !this.state.emptyNameAlertVisible &&
            !this.state.emptyAddressAlertVisible && this.dataNotEmpty()
    }

    render() {
        return <Form onSubmit>
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="id">Id</Label>
                        <Input type="text" name="id" id="id" onChange={this.handleChange} value={this.state.id} disabled />
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" onChange={this.handleChange} value={this.state.name} placeholder="Type new device name" />
                    </FormGroup>
                    <Alert color="danger" isOpen={this.state.nameAlertVisible}>
                        Name has been used by another device
                    </Alert>
                    <Alert color="danger" isOpen={this.state.emptyNameAlertVisible}>
                        Name cannot be empty
                    </Alert>
                    <FormGroup>
                        <Label for="desc">Desc</Label>
                        <Input type="text" name="desc" id="desc" onChange={this.handleChange} value={this.state.desc} placeholder="Type new device description" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address" onChange={this.handleChange} value={this.state.address} placeholder="Type new device address" />
                    </FormGroup>
                    <Alert color="danger" isOpen={this.state.addressAlertVisible}>
                        Address has been used by another device
                    </Alert>
                    <Alert color="danger" isOpen={this.state.emptyAddressAlertVisible}>
                        Address cannot be empty
                    </Alert>
                    <FormGroup>
                        <Label for="interval">Interval (in seconds)</Label>
                        <Input type="number" name="interval" id="interval" onChange={this.handleChange} value={this.state.interval}/>
                    </FormGroup>
                    <Alert color="danger" isOpen={this.state.intervalAlertVisible}>
                        Interval has to be higher than 0
                    </Alert>
                </Col>
            </Row>
            <Row>
                <Col md={{ size: 6 }}>{this.getSaveButton()}</Col>
                <Col md={{ size: 6 }}><Button color="danger" onClick={event => this.reset(event)} block>Reset</Button></Col>
            </Row>
        </Form>
    }
}