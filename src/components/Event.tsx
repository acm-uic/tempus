import  { FC } from 'react';
import * as GCalApi from '../models/GCalApi';

interface EventProps {
    ev: GCalApi.Event;
};

const Event: FC<EventProps> = (props: EventProps) => {
    const { summary, location, start, end } = props.ev;
    return (
        <>
            <h1>
                {summary ? summary : 'Busy'}
            </h1>
            <h2>
                {start ? (start.dateTime ? start.dateTime : start.date) : <></>} | {end ? (end.dateTime ? end.dateTime : end.date) : <></>}
            </h2>
            <h3>
                {location}
            </h3>
        </>
    );
}

export default Event;
