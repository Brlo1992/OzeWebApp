import React from 'react'
import { Row, Col, Card, Button, CardTitle, CardText, Collapse } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import httpClient from '../../../Utils/HttpClient';
import config from "../../../Configs/config";

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actionsOpen: true,
            detailsOpen: true
        };
    }

    toggleActions = () => {
        this.setState({ actionsOpen: !this.state.actionsOpen });
    }

    toggleDetails = () => {
        this.setState({ detailsOpen: !this.state.detailsOpen })
    }

    click = (event, action) => {
        event.stopPropagation();
        action();
    }

    navigateToMeasurements = () => {
        this.props.history.push("/measurements/".concat(this.props.device.id + "/" + this.props.device.name))
    }

    navigateToSettings = () => {
        this.props.history.push("/settings/".concat(this.props.device.id))
    }

    edit = () => {
        this.props.toggleEditDevice({
            id: this.props.device.id,
            name: this.props.device.name,
            desc: this.props.device.desc,
            details: this.props.device.details,
            address: this.props.device.address,
            interval: this.props.device.interval
        });
    }

    remove = async () => {
        let url = config.apiUrl.concat("/device/remove");

        let request = {
            method: 'DELETE',
            body: JSON.stringify({
                id: this.props.device.id
            }),
            headers: { 'Content-Type': 'application/json' }
        };

        await httpClient.SendWithData(url, request, this.props.getItems)
    }

    getDeviceType = () => {
        if (this.props.device.type === "energyGenerator") {
            return "Energy generator"
        }
        if (this.props.device.type === "energyConsumer") {
            return "Energy consumer"
        }
    }

    getDeviceMarker = () => {
        if (this.props.device.type === "energyGenerator") {
            return <Row>
                <Col><h5 className="energyGenerator">This device generate energy</h5></Col>
            </Row>
        }
        if (this.props.device.type === "energyConsumer") {
            return <Row>
                <Col><h5 className="energyConsumer">This device consume energy</h5></Col>
            </Row>
        }
    }

    render() {
        return <div>
            <Card body outline color="info" onClick={this.toggleActions} className="text-center">
                <CardTitle><h3>Device {this.props.device.name}</h3></CardTitle>
                <br />
                {this.getDeviceMarker()}
                <br />
                <Collapse isOpen={this.state.actionsOpen}>
                    <Row>
                        <Col><Button color="info" onClick={(event) => { this.click(event, this.toggleDetails) }} block>Details</Button></Col>
                        <Col><Button color="info" onClick={(event) => { this.click(event, this.navigateToMeasurements) }} block>Measurements</Button></Col>
                        <Col><Button color="info" onClick={(event) => { this.click(event, this.edit) }} block>Edit</Button></Col>
                        <Col><Button color="info" onClick={(event) => { this.click(event, this.remove) }} block>Remove</Button></Col>
                    </Row>
                </Collapse>
                <br />
                <Collapse isOpen={this.state.detailsOpen}>
                    <hr className="hrClass" />
                    <Row>
                        <Col>
                            <Row>
                                <Col><h4>Settings</h4></Col>
                            </Row>
                            <Row>
                                <Col >
                                    <h5>Interval: </h5>
                                </Col>
                                <Col>
                                    <h5>{this.props.device.interval}</h5>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <h5>Address: </h5>
                                </Col>
                                <Col>
                                    <h5>{this.props.device.address}</h5>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <h5>Device type: </h5>
                                </Col>
                                <Col>
                                    <h5>{this.getDeviceType()}</h5>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <br />
                    <hr className="hrClass" />
                    <Row>
                        <Col>
                            <Row>
                                <Col><h4>Details</h4></Col>
                            </Row>
                            <Row>
                                <Col >
                                    <h5>Description: </h5>
                                </Col>
                                <Col>
                                    <h5>{this.props.device.desc}</h5>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <h5>Measurements counts: </h5>
                                </Col>
                                <Col>
                                    <h5>{this.props.device.measurementCount}</h5>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <h5>Last measurement date: </h5>
                                </Col>
                                <Col>
                                    <h5>{this.props.device.lastMeasurementDate}</h5>
                                </Col>
                            </Row>
                            <br />
                        </Col>
                    </Row>
                </Collapse>
            </Card>
            <br />
        </div>
    }
}

export default withRouter(Item);
