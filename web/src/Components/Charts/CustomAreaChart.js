import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const data = [
  {
    name: '10.08.19', usedEnergy: 100, createdEnergy: 20
  },
  {
    name: '20.08.19', usedEnergy: 300, createdEnergy: 120
  },
  {
    name: '30.08.19', usedEnergy: 500, createdEnergy: 220
  },
  {
    name: '10.09.19', usedEnergy: 550, createdEnergy: 320
  },
  {
    name: '20.09.19', usedEnergy: 690, createdEnergy: 420
  },
  {
    name: '30.09.19', usedEnergy: 780, createdEnergy: 520
  },
  {
    name: '10.10.19', usedEnergy: 890, createdEnergy: 620
  },
];

export default class CustomAreaChart extends PureComponent {

  render() {
    return (
      <AreaChart
        width={1000}
        height={400}
        data={data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="usedEnergy" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="createdEnergy" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    );
  }
}
