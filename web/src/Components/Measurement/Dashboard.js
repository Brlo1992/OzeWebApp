import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from "../Common/Header";
import config from "../../Configs/config";
import Pager from "../Common/Pager";
import { Table } from 'reactstrap';
import httpClient from "../../Utils/HttpClient";
import Subheader from "../Common/Subheader";
import ChartTabs from '../Charts/ChartTabs';

export default class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            measurements: [],
            itemsPerPage: 10,
            currentPage: 0
        }
    }

    fillItems = (response) => {
        this.setState({
            measurements: response
        });
    }

    async componentDidMount() {
        let url = config.apiUrl.concat("/measurement/getForDevice?id=".concat(this.props.match.params.id));

        await httpClient.Send(url, this.fillItems);
    }

    getMeasurements = () => {

        let measurements = this.state.measurements.slice(
            this.state.currentPage * this.state.itemsPerPage,
            (this.state.currentPage * this.state.itemsPerPage) + this.state.itemsPerPage)

        return <tbody>
            {measurements.map(measurement => <tr>
                <th>{measurement.date}</th>
                <th>{measurement.tension}</th>
                <th>{measurement.intensity}</th>
                <th>{measurement.fraquency}</th>
                <th>{measurement.activePower}</th>
                <th>{measurement.ccccc}</th>
                <th>{measurement.powerFactor}</th>
                <th>{measurement.activeEnergy}</th>
                <th>{measurement.tariffOne}</th>
                <th>{measurement.reactiveEnergy}</th>
                <th>{measurement.tariffTwo}</th>
                <th>{measurement.tariffThree}</th>
                <th>{measurement.spped}</th></tr>)}
        </tbody>
    }

    changePage = (page) => {
        this.setState({
            currentPage: page
        });
    }

    getPager = () => {
        if (this.state.measurements.length > this.state.itemsPerPage) {
            return <Pager
                items={this.state.measurements}
                maxItemPerPage={this.state.itemsPerPage}
                changePage={this.changePage} />
        }

        return <div></div>
    }

    render() {
        return <Container>
            <br />
            <Header content="Measurements" />
            <br />
            <hr class="hrClass" />
            <Subheader content={"Device " + this.props.match.params.name} />
            <br />
            <ChartTabs measurements={this.state.measurements.map(measurement => {
                return {
                   tension: measurement.tension, 
                   intensity: measurement.intensity, 
                   activePower: measurement.activePower, 
                   reactivePower: measurement.reactivePower, 
                   activeEnergy: measurement.activeEnergy, 
                   reactiveEnergy: measurement.reactiveEnergy 
                }
            })} />
            <br />
            <Row>
                <Col>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>date</th>
                                <th>tension</th>
                                <th>intensity</th>
                                <th>fraquency</th>
                                <th>active power</th>
                                <th>reactive power</th>
                                <th>power factor</th>
                                <th>active energy</th>
                                <th>tariff one</th>
                                <th>reactive energy</th>
                                <th>tariff two</th>
                                <th>tariff three</th>
                                <th>speed</th>
                            </tr>
                        </thead>
                        {this.getMeasurements()}
                    </Table>
                </Col>
            </Row>
            {this.getPager()}
            <br />
        </Container>
    }
}
