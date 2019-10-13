import React from 'react';
import { Row, Col } from 'reactstrap';
import CustomLineChart from './CustomLineChart';

export default class ChartTabs extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            measurements: [],
            measurementKeys: [
                { name: "tension", color: "blue" },
                { name: "intensity", color: "orange" },
                { name: "activePower", color: "red" },
                { name: "reactivePower", color: "green" },
                { name: "activeEnergy", color: "black" },
                { name: "reactiveEnergy", color: "gray" }
            ]
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.measurements.length !== state.measurements.length) {
            return {
                measurements: props.measurements
            };
        }

        return null;
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs="6">
                        <CustomLineChart data={this.state.measurements} name={this.state.measurementKeys[0].name} color={this.state.measurementKeys[0].color} />
                    </Col>
                    <Col xs="6">
                        <CustomLineChart data={this.state.measurements} name={this.state.measurementKeys[1].name} color={this.state.measurementKeys[1].color} />
                    </Col>
                    <Col xs="6">
                        <CustomLineChart data={this.state.measurements} name={this.state.measurementKeys[2].name} color={this.state.measurementKeys[2].color} />
                    </Col>
                    <Col xs="6">
                        <CustomLineChart data={this.state.measurements} name={this.state.measurementKeys[3].name} color={this.state.measurementKeys[3].color} />
                    </Col>
                    <Col xs="6">
                        <CustomLineChart data={this.state.measurements} name={this.state.measurementKeys[4].name} color={this.state.measurementKeys[4].color} />
                    </Col>
                    <Col xs="6">
                        <CustomLineChart data={this.state.measurements} name={this.state.measurementKeys[5].name} color={this.state.measurementKeys[5].color} />
                    </Col>
                </Row>
            </div>
        );
    }
}