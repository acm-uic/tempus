import React, { PureComponent } from 'react';
import { CtaBusConfig } from '../util/Config'

interface BusProps {
    route: string;
    arrival: Date;
    direction: string;
};

interface BusState {
    eta: number;
};

class Bus extends PureComponent<BusProps, BusState> {
    constructor(props: BusProps) {
        super(props);
        this.state = {
            eta: Math.trunc((props.arrival.getTime() - new Date().getTime()) / 1000 / 60)
        };
    }

    componentDidMount() {
        setInterval(this.update, CtaBusConfig.CountdownInterval);
    }

    update = () => {
        this.setState({
            eta: Math.trunc((this.props.arrival.getTime() - new Date().getTime()) / 1000 / 60)
        });
    };

    render = () => {
        const { route, direction } = this.props;
        const { eta } = this.state;
        return (<>
            <div className='Bus'>
                {route} | {direction} | {eta}
            </div>
        </>);
    };
}

export default Bus;
