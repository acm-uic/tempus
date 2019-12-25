import React, { FC, useEffect, useState } from 'react';
import { Routes } from '../models/CtaTrainApi';
import { CtaTrainConfig } from '../util/Config'

interface TrainProps {
    route: Routes;
    arrival: Date;
    destination: string;
};

const Train: FC<TrainProps> = ({ route, destination, arrival }: TrainProps) => {

    const [eta, setEta] = useState<number>();

    useEffect(() => {
        const update = () => {
            setEta(Math.trunc((arrival.getTime() - new Date().getTime()) / 1000 / 60));
        };

        update();
        const updateInterval = setInterval(update, CtaTrainConfig.CountdownInterval);
        return (() => {
            clearInterval(updateInterval);
        });
    }, [arrival]);

    return (
        <>
            <h1>
                {route} - {destination}
            </h1>
            <h2>
                {eta} minutes
        </h2>
        </>
    );
}

export default Train;
