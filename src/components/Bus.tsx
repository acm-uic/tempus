import React, { FC, useEffect, useState } from 'react';
import { CtaBusConfig } from '../util/Config'

interface BusProps {
    route: string;
    arrival: Date;
    direction: string;
};

const Bus: FC<BusProps> = ({ route, direction, arrival }: BusProps) => {

    const [eta, setEta] = useState<number>();

    useEffect(() => {
        const update = () => {
            setEta(Math.trunc((arrival.getTime() - new Date().getTime()) / 1000 / 60));
        };
        update();
        const updateInterval = setInterval(update, CtaBusConfig.CountdownInterval);
        return (() => {
            clearInterval(updateInterval);
        });
    }, [arrival]);

    return (
        <>
            <h1>
                {route} - {direction}
            </h1>
            <h2>
                {eta} minutes
            </h2>
        </>
    );
}

export default Bus;
