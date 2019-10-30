import React from 'react';
import { Container, Row, Col, Card, Button, CardTitle, CardText, CardGroup } from 'reactstrap';
import Header from "../Common/Header";
import config from "../../Configs/config";
import httpClient from '../../Utils/HttpClient';
import CustomBarChart  from '../Charts/CustomBarChart';
export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            energyUsed: 0,
            energyCreated: 0,
            energyUnitCost: 0.0,
            createdEnergyProfit: 0,
            usedEnergyCost: 0,
            costBalance: 0,
            deviceCount: 0,
            energyBalance: 0,
            energyUsedChart:[],
            energyCreatedChart:[]
        }
    }
    
    fillState = (response) => {
        this.setState({
            deviceCount: response.devicesCount,
            energyUsed: response.energyUsed,
            energyCreated: response.energyCreated,
            energyBalance: response.energyBalance,
            energyUnitCost: response.energyUnitCost,
            createdEnergyProfit: response.createdEnergyProfit,
            usedEnergyCost: response.usedEnergyCost,
            costBalance: response.costBalance,
            energyCreatedChart: response.energyCreatedChart,
            energyUsedChart:response.energyUsedChart
        });
    }

    getDashboardData = async () => {
        let url = config.apiUrl.concat("/main/dashboard");

        await httpClient.Send(url, this.fillState);
    }

    async componentDidMount(){
        this.getDashboardData();
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
                    <Row>
                            <Col xs="4">
                                <div className="summaryColumn">
                                    <h4>Energy</h4>
                                    <br/>
                                    <p>Used energy: {this.state.energyUsed} kWh</p>
                                    <p>Created energy: {this.state.energyCreated} kWh</p>
                                    <p>Energy balance: {this.state.energyBalance} kWh</p>
                                </div>
                            </Col>
                            <Col xs="4">
                                <div className="summaryColumn">
                                    <h4>Details</h4>
                                    <br/>
                                    <p>Devices count: {this.state.deviceCount}</p>
                                    <p>Cost of energy unit: {this.state.energyUnitCost} zl</p>
                                </div>
                            </Col>
                            <Col xs="4">
                                <div className="summaryColumn">
                                    <h4>Costs</h4>
                                    <br/>
                                    <p>Created energy profit: {this.state.createdEnergyProfit} zl</p>
                                    <p>Used energy cost: {this.state.usedEnergyCost} zl</p>
                                    <p>Cost balance: {this.state.costBalance} zl</p>
                                </div>
                            </Col>
                        </Row>
                        <br/>
                        <h3>Created energy</h3>
                        <CustomBarChart  data={this.state.energyCreatedChart} fill="green"/>
                        <br />
                        <h3>Used energy</h3>
                        <CustomBarChart  data={this.state.energyUsedChart} fill="red"/>
                        <br />
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
                    </CardGroup>
                </Col>
            </Row>
            <br />
        </Container>
    }
}