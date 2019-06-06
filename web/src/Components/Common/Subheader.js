import React from 'react';
import {Row, Col} from 'reactstrap';

export const Component = (props) => {
    return <Row>
        <Col>
            <h3>{props.content}</h3>
        </Col>
    </Row>
}

export default Component