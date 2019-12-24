import React, { FC } from 'react';
import Clock from '../components/Clock';
import Weather from '../components/Weather';
import Events from '../components/Events';
import Message from '../components/Message';
import Transit from '../components/Transit';
import Footer from '../components/Footer';

const Home: FC = () => {
    return (
        <>
            <Clock />
            <Weather />
            <Transit />
            <Events />
            <Message />
            <Footer />
        </>
    );
}

export default Home;
