import React, { FC, useEffect, useState } from 'react';
import Clock from '../components/Clock';
import Weather from '../components/Weather';
import Events from '../components/Events';
import SlackBot from '../components/SlackBot';
import Transit from '../components/Transit';
import Footer from '../components/Footer';

const Home: FC = () => {

    const [position, setPosition] = useState<Position>();

    useEffect(() => {
        const getPosition = (options: PositionOptions | undefined): Promise<Position> => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, options);
            });
        }
        getPosition({ enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }).then(setPosition);
    }, []);

    return (
        <>
            <Clock />
            <Weather position={position} />
            <Transit position={position} />
            <Events />
            <SlackBot />
            <Footer />
        </>
    );
}

export default Home;
