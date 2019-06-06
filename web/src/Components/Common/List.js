import React from 'react';
import { Row, Col } from 'reactstrap';
const generate = (getCurrentPageItems, signature, getItems, toggleEditDevice) => {
    let items = getCurrentPageItems();

    if (items) {
        return items.map(item => signature(item, getItems, toggleEditDevice));
    }
    else {
        return <Row><Col><h4>Empty collection</h4></Col></Row>
    }
}

export const List = (props) => {
    return <Row>
        <Col>
            {generate(props.getCurrentPageItems, props.signature, props.getItems, props.toggleEditDevice)}
        </Col>
    </Row>
}

export default List