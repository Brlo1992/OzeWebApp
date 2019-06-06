import React from 'react'
import { Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import config from "../../Configs/config";
import httpClient from "../../Utils/HttpClient";

export default class NewDevice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            desc: "",
            address: "",
            interval: 0,
            nameAlertVisible: false,
            addressAlertVisible: false,
            intervalAlertVisible: false,
            emptyAddressAlertVisible: false,
            emptyNameAlertVisible: false
        }
    }

    submit = async (event) => {
        event.stopPropagation();

        let data = {
            name: this.state.name,
            desc: this.state.desc,
            address: this.state.address,
            interval: Number(this.state.interval)
        }

        console.log(data);

        await this.addDevice(data);
    }

    addDevice = async (data) => {
        let url = config.apiUrl.concat("/".concat("device/add"));

        let request = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        };

        await httpClient.SendWithData(url, request, () => {
            this.clear();
            this.props.getItems();
        });

    }

    clear = (event) => {
        if (event) {
            event.stopPropagation();
        }

        this.setState({
            name: "",
            desc: "",
            address: "",
            interval: 0,
            nameAlertVisible: false,
            addressAlertVisible: false,
            intervalAlertVisible: false,
            emptyAddressAlertVisible: false,
            emptyNameAlertVisible: false
        });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });

        if (event.target.name === "address") {
            if (this.props.checkAddressExist(event.target.value, this.props.items))
                this.setState({ addressAlertVisible: true });
            else
                this.setState({ addressAlertVisible: false });
            if (!this.props.checkIsNotEmpty(event.target.value))
                this.setState({ emptyAddressAlertVisible: true });
            else
                this.setState({ emptyAddressAlertVisible: false });
        }

        if (event.target.name === "name") {
            if (this.props.checkNameExist(event.target.value, this.props.items))
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

    getAddButton = () => {
        let addButton = <Button color="success" onClick={event => this.submit(event)} block>Add device</Button>;

        if (this.isDataValid() === false)
            addButton = <Button color="success" disabled onClick={event => this.submit(event)} block>Add device</Button>;

        return addButton;
    }

    dataNotEmpty = () => {
        if (this.state.name && this.state.address &&
            this.props.checkIntervalIsZero(this.state.interval) === false) {
            return true;
        }

        return false;
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
                        <Input type="number" name="interval" id="interval" onChange={this.handleChange} value={this.state.interval} placeholder="Type new device address" />
                    </FormGroup>
                    <Alert color="danger" isOpen={this.state.intervalAlertVisible}>
                        Interval has to be higher than 0
                    </Alert>
                </Col>
            </Row>
            <Row>
                <Col md={{ size: 2, offset: 8 }}>{this.getAddButton()}</Col>
                <Col md={{ size: 2 }}><Button color="danger" onClick={event => this.clear(event)} block>Clear</Button></Col>
            </Row>
        </Form>
    }
}