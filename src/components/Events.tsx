import React, { PureComponent } from 'react';
import Event from './Event';
import * as GCalApi from '../models/GCalApi';
import { GetEvents } from '../util/Events';
import { EventsConfig } from '../util/Config';
import { GetUserConfig } from '../util/UserConfig';

interface EventsState {
    events: GCalApi.Events | undefined;
}

class Events extends PureComponent<{}, EventsState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            events: undefined
        };
    }
    componentDidMount() {
        this.update();
        setInterval(this.update, EventsConfig.UpdateInterval);
    }
    update = async () => {
        const calendarId = GetUserConfig({
            name: EventsConfig.IdsName
        });
        const apiKey = GetUserConfig({
            name: EventsConfig.ApiKeyName
        });
        if (calendarId && apiKey)
            this.setState({
                events: await GetEvents({ calendarId, apiKey })
            });
    }
    render = () => {
        return (<>
            {(this.state.events && this.state.events.items)
                ? this.state.events.items.map((ev, key) =>
                    (<Event key={key} ev={ev} />))
                : (<></>)}
        </>);
    }
}

export default Events;
