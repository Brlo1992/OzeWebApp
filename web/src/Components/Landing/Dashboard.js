import React from 'react';
import { Container, Row, Col, Card, Button, CardTitle, CardText, CardGroup } from 'reactstrap';
import Header from "../Common/Header";
import CustomAreaChart from "../Charts/CustomAreaChart";
export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usedEnergy: 0,
            createdEnergy: 0,
            energyUnitCost: 0.0,
            createdEnergyProfit: 0,
            usedEnergyCost: 0,
            costBalance: 0
        }
    }
    render() {
        return <Container>
            <br />
            <Header content="Prosumer Instalaltion Monitoring System" />
            <br />
            <hr />
            <br />
            <Row>
                <Col xs="12" >
                    <Card body>
                        <CustomAreaChart />
                        <br />
                        <Row>
                            <Col xs="12">
                                <h3>Summary</h3>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col xs="4">
                                <div className="summaryColumn">
                                    <p>Used energy: {this.state.usedEnergy} kWh</p>
                                    <p>Created energy: {this.state.createdEnergy} kWh</p>
                                </div>
                            </Col>
                            <Col xs="4">
                                <div className="summaryColumn">
                                    <p>Cost of energy unit: {this.state.usedEnergy} zl</p>
                                </div>
                            </Col>
                            <Col xs="4">
                                <div className="summaryColumn">
                                    <p>Created energy profit: {this.state.createdEnergyProfit} zl</p>
                                    <p>Used energy cost: {this.state.usedEnergyCost} zl</p>
                                    <p>Cost balance: {this.state.costBalance} zl</p>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <br />
            <Row>
                <Col xs="12" >
                    <CardGroup>
                        <Card body>
                            <CardTitle>Devices</CardTitle>
                            <br />
                            <CardText>Manage devices connected to the prosumer installation</CardText>
                            <Button color="success" onClick={() => { this.props.history.push("/devices") }}>Devices</Button>
                        </Card>
                        <Card body >
                            <CardTitle>Forecasts</CardTitle>
                            <br />
                            <CardText>Manage forecast which base on the collected data and weather forecast</CardText>
                            <Button color="warning" onClick={() => { this.props.history.push("/forecasts") }}>Forecasts</Button>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
            <br />
        </Container>
    }
}