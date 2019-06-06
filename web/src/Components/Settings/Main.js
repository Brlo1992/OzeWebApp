import React from 'react';
import { Container } from 'reactstrap';
import Header from "../Common/Header";

export default class Main extends React.Component {
    render() {
        return <Container>
            <Header content="Settings" />
        </Container>
    }
}
