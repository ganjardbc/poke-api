import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class Charts extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

    render() {
        const {data} = this.props 
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={'100%'}
                    height={'100%'}
                    data={data}
                    margin={{
                        top: 0,
                        right: 0,
                        left: -10,
                        bottom: 0,
                    }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="base_stat" fill="#8884d8" width={10} />
                <Bar dataKey="effort" fill="#82ca9d" width={10} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default Charts