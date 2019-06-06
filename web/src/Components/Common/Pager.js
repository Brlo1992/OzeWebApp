import React, { Component } from 'react';
import { Row, Col, Button, } from 'reactstrap';


export default class Pager extends Component {

    constructor(props) {
        super(props);

        this.state = this.getPageCount()
    }

    getPageCount = () => {
        if (this.props.items.length > this.props.maxItemPerPage) {
            let pages = Math.floor(this.props.items.length / this.props.maxItemPerPage);

            return {
                showPager: true,
                firstPage: 0,
                currentPage: 0,
                lastPage: pages
            };
        }
        else {
            return { showPager: false }
        }
    }

    firstPage = () => {
        this.setState({
            currentPage: 0
        });

        this.props.changePage(0);
    }

    lastPage = () => {
        this.setState({
            currentPage: this.state.lastPage
        });

        this.props.changePage(this.state.lastPage);
    }

    nextPage = () => {
        if (!(this.state.currentPage === this.state.lastPage)) {
            let currentPage = ++this.state.currentPage

            this.setState({
                currentPage: currentPage
            });

            this.props.changePage(currentPage);
        }
    }

    previousPage = () => {
        if (!(this.state.currentPage === 0)) {
            let currentPage = --this.state.currentPage

            this.setState({
                currentPage: currentPage
            });

            this.props.changePage(currentPage);
        }
    }

    showPage = (value) => value + 1;

    render() {
        if (this.state.showPager) {
            return <Row>
                <Col md={{ size: 6, offset: 3 }}>
                    <Row>
                        <Col><Button color="info" block onClick={this.firstPage}>{this.showPage(this.state.firstPage)}</Button></Col>
                        <Col><Button color="info" block onClick={this.previousPage}>{"<"}</Button></Col>
                        <Col><Button color="info" block>{this.showPage(this.state.currentPage)}</Button></Col>
                        <Col><Button color="info" block onClick={this.nextPage}>{">"}</Button></Col>
                        <Col><Button color="info" block onClick={this.lastPage}>{this.showPage(this.state.lastPage)}</Button></Col>
                    </Row>
                </Col>
            </Row>
        } else {
            return <div></div>
        }
    }
}

