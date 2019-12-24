import { EventsConfig } from './Config';
import * as GCalApi from '../models/GCalApi';

interface GetEventsParams {
    calendarId: string;
    apiKey: string;
    maxResults?: number;
}

export const GetEvents = async ({ calendarId, apiKey, maxResults }: GetEventsParams): Promise<GCalApi.Events> => {
    return new Promise((resolve, reject) => {
        if (!maxResults)
            maxResults = 10;
        fetch(`${EventsConfig.ApiHost}/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${(new Date()).toISOString()}&maxResults=${maxResults}`)
            .then(res => resolve(res.json()))
            .catch(reject);
    });
}
