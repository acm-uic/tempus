import  { FC, useEffect, useState } from 'react';
import Event from './Event';
import * as GCalApi from '../models/GCalApi';
import { GetEvents } from '../util/Events';
import { EventsConfig } from '../util/Config';
import { GetUserConfig } from '../util/UserConfig';

const Events: FC = () => {
    const [events, setEvents] = useState<GCalApi.Events>();

    const update = async () => {
        const calendarId = GetUserConfig({
            name: EventsConfig.IdsName
        });
        const apiKey = GetUserConfig({
            name: EventsConfig.ApiKeyName
        });
        if (calendarId && apiKey)
            setEvents(await GetEvents({ calendarId, apiKey }));
    }

    useEffect(() => {
        update();
        const updateInterval = setInterval(update, EventsConfig.UpdateInterval);
        return (() => {
            clearInterval(updateInterval);
        });
    }, []);
    
    return (<>
        {(events && events.items)
            ? events.items.map((ev, key) =>
                (<Event key={key} ev={ev} />))
            : (<></>)}
    </>);
}

export default Events;
