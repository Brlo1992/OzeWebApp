import React from 'react';
import { Container, Modal, ModalBody, ModalHeader } from 'reactstrap';
import Header from "../Common/Header";
import List from "../Common/List";
import Item from './List/Item';
import NewDevice from "./NewDevice";
import config from "../../Configs/config";
import httpClient from '../../Utils/HttpClient';
import EditDevice from './EditDevice';
import Pager from "../Common/Pager";
import Subheader from "../Common/Subheader";

export default class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            itemsPerPage: 5,
            items: [],
            editDeviceModal: false,
            editedDevice: undefined
        }
    }

    showDevice = (device, getItems, toggleEditDevice) => {
        return <Item device={device} getItems={getItems} toggleEditDevice={toggleEditDevice} />
    }

    async componentDidMount() {
        await this.getItems();
    }

    checkAddressExist = (address, items) => {
        var value = items.find(x => x.address === address);

        if (value) {
            return true;
        }
        else {
            return false;
        }
    }

    checkNameExist = (name, items) => {
        var value = items.find(x => x.name === name);

        if (value) {
            return true;
        }
        else {
            return false;
        }
    }

    checkIsNotEmpty = (value) => {
        if (value) {
            return true;
        }
        else {
            return false;
        }
    }

    getItems = async () => {
        let url = config.apiUrl.concat("/device/all");

        await httpClient.Send(url, this.fillItems);
    }

    fillItems = (response) => {
        this.setState({
            items: response
        });
    }

    toggleEditDevice = (device) => {
        if (this.state.editDeviceModal) {
            this.setState({
                editedDevice: undefined,
                editDeviceModal: !this.state.editDeviceModal
            });
        }
        else {
            this.setState({
                editedDevice: device,
                editDeviceModal: !this.state.editDeviceModal
            });
        }
    }


    checkIntervalIsZero = (value) => {
        return Number(value) === 0;
    }

    changePage = (page) => {
        this.setState({
            currentPage: page
        });
    }

    getCurrentPageItems = () => {
        let devices = this.state.items.slice(
            this.state.currentPage * this.state.itemsPerPage,
            (this.state.currentPage * this.state.itemsPerPage) + this.state.itemsPerPage);

        if(devices.length){

        }
        return devices;
    }

    getPager = () => {
        if (this.state.items.length > this.state.itemsPerPage) {
            return <Pager
                items={this.state.items}
                maxItemPerPage={this.state.itemsPerPage}
                changePage={this.changePage} />
        }

        return <div></div>
    }

    render() {
        return <Container>
            <br />
            <Header content="Measure Devices List" />
            <Header content="Measure Devices List" />
            <br />
            <hr class="hrClass"/>
            <Subheader content="Add new device" />
            <br />
            <NewDevice
                items={this.state.items}
                getItems={this.getItems}
                checkAddressExist={this.checkAddressExist}
                checkNameExist={this.checkNameExist}
                checkIntervalIsZero={this.checkIntervalIsZero}
                checkIsNotEmpty={this.checkIsNotEmpty} />
            <br />
            <hr class="hrClass"/>
            <Subheader content="All devices" />
            <br />
            <List
                getCurrentPageItems={this.getCurrentPageItems}
                signature={this.showDevice}
                getItems={this.getItems}
                toggleEditDevice={this.toggleEditDevice} />
            {this.getPager()}
            <br />
            <Modal
                isOpen={this.state.editDeviceModal}
                toggle={this.toggleEditDevice}
                className={this.props.className}>
                <ModalHeader toggle={this.toggleEditDevice}>Edit device</ModalHeader>
                <ModalBody>
                    <EditDevice
                        items={this.state.items}
                        toggleEditDevice = {this.toggleEditDevice}
                        getItems={this.getItems}
                        checkAddressExist={this.checkAddressExist}
                        checkNameExist={this.checkNameExist}
                        checkIntervalIsZero={this.checkIntervalIsZero}
                        editedDevice={this.state.editedDevice}
                        checkIsNotEmpty={this.checkIsNotEmpty} />
                </ModalBody>
            </Modal>
        </Container>
    }
}
