import React from 'react';
import {Row, Col} from 'reactstrap';

export const Component = (props) => {
    return <Row>
        <Col>
            <h1>{props.content}</h1>
        </Col>
    </Row>
}

export default Component