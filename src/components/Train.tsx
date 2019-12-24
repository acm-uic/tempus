import React, { PureComponent } from 'react';
import { Routes } from '../models/CtaTrainApi';
import { CtaTrainConfig } from '../util/Config'
interface TrainProps {
    route: Routes;
    arrival: Date;
    destination: string;
};

interface TrainState {
    eta: number;
};

class Train extends PureComponent<TrainProps, TrainState> {
    constructor(props: TrainProps) {
        super(props);
        this.state = {
            eta: Math.trunc((props.arrival.getTime() - new Date().getTime()) / 1000 / 60)
        };
    }

    componentDidMount() {
        setInterval(this.update, CtaTrainConfig.CountdownInterval);
    }

    update = () => {
        this.setState({
            eta: Math.trunc((this.props.arrival.getTime() - new Date().getTime()) / 1000 / 60)
        });
    };

    render = () => {
        const { route, destination } = this.props;
        const { eta } = this.state;
        return (<>
            <div className='train'>
                {route} | {destination} | {eta}
            </div>
        </>);
    };
}

export default Train;
