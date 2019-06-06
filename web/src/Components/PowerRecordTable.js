import React, { Component } from 'react';
import { Row, Col, Alert } from 'reactstrap';
import PowerRecord from './PowerRecord';
import Pager from '../Pager';

const headerStyle = {
    color: "#004085",
    backgroundColor: "#cce5ff",
    textAlign:"center",
    paddingTop:5,
    paddingBottom:5
};

export default class PowerRecordTable extends Component {
  render() {
    return <Row style={{marginTop:10, marginBottom: 10}}>
        <Col>
            <Row>
                <Col sm={4} style={headerStyle}>Urządzenie</Col>
                <Col style={headerStyle}>AC</Col>
                <Col style={headerStyle}>DC</Col>
                <Col style={headerStyle}>Czest.</Col>
                <Col style={headerStyle}>Temp.</Col>
                <Col style={headerStyle}>Napiecie</Col>
                <Col style={headerStyle}>Energia</Col>
                <Col style={headerStyle}>Prad</Col>
                <Col style={headerStyle}>Cos fi</Col>
                <Col style={headerStyle}>Moc</Col>
            </Row>
            <PowerRecord />
            <PowerRecord />
            <PowerRecord />
            <PowerRecord />
            <PowerRecord />
            <PowerRecord />
            <Pager />
        </Col>
    </Row>
  }
}
