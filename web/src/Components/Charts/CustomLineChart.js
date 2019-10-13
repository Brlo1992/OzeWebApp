import React, { PureComponent } from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


export default class CustomLineChart extends PureComponent {
    render() {
        console.log(this.props.data);
        return (
            <LineChart
                width={500}
                height={300}
                data={this.props.data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={this.props.name} stroke={this.props.color}activeDot={{ r: 8 }} />
            </LineChart>
        );
    }
}