import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from "../Common/Header";
import config from "../../Configs/config";
import Pager from "../Common/Pager";
import { Table } from 'reactstrap';
import httpClient from "../../Utils/HttpClient";
import Subheader from "../Common/Subheader";

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
                <th>{measurement.ac}</th>
                <th>{measurement.dc}</th>
                <th>{measurement.fraquency}</th>
                <th>{measurement.temp}</th>
                <th>{measurement.energy}</th>
                <th>{measurement.electricity}</th>
                <th>{measurement.tension}</th>
                <th>{measurement.cosFi}</th>
                <th>{measurement.power}</th></tr>)}
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
            <hr class="hrClass"/>
            <Subheader content={"Device " + this.props.match.params.name} />
            <br />
            <Row>
                <Col>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>date</th>
                                <th>ac</th>
                                <th>dc</th>
                                <th>fraquency</th>
                                <th>temp</th>
                                <th>energy</th>
                                <th>electricity</th>
                                <th>tension</th>
                                <th>cosFi</th>
                                <th>power</th>
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
