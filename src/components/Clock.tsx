import React, { PureComponent } from 'react';
import { DaysOfTheWeek, MonthNames } from '../models/Date';

interface ClockState {
    time: Date;
}

class Clock extends PureComponent<{}, ClockState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            time: new Date(),
        }
    }

    componentDidMount() {
        setInterval(this.update, 1000);
    }

    update = () => {
        this.setState({
            time: new Date(),
        })
    };

    render() {
        const t_h = this.state.time.getHours();
        const t_m = this.state.time.getMinutes();
        const t_s = this.state.time.getSeconds();

        const d_d = DaysOfTheWeek[this.state.time.getDay()];
        const d_m = MonthNames[this.state.time.getMonth()];
        const d_dt = this.state.time.getDate();

        return (
            <>
                <div className='clock-time'>{(t_h % 12).toString().padStart(2, '0')}:{(t_m).toString().padStart(2, '0')}:{(t_s).toString().padStart(2, '0')} {t_h < 12 ? 'AM' : 'PM'}</div>
                <div className='clock-date'>{d_d}, {d_m} {d_dt}</div>
            </>
        );
    }
}

export default Clock;
