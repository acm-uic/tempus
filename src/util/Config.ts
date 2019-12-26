export const CtaBusConfig = {
    ApiHost: `${window.location.origin}/ctabus/`,
    ApiKeyName: 'ctabusapikey',
    Routes: 'ctabusroutes',
    CountdownInterval: 5000,
}

export const CtaTrainConfig = {
    ApiHost: `${window.location.origin}/ctatrain/`,
    ApiKeyName: 'ctatrainapikey',
    Routes: 'ctatrainroutes',
    CountdownInterval: 5000,
}

export const TransitConfig = {
    GTFSHost: `${window.location.origin}/ctagtfs/`,
    CtaTrain: CtaTrainConfig,
    CtaBus: CtaBusConfig,
    UpdateInterval: 60000,
}

export const DarkSkyConfig = {
    ApiHost: `${window.location.origin}/darksky/`,
    ApiKeyName: 'darkskyapikey',
    LatLongName: 'latlong',
    UpdateInterval: 60000,
}

export const EventsConfig = {
    ApiHost: 'https://www.googleapis.com/',
    ApiKeyName: 'googleapikey',
    IdsName: 'googlecalendarids',
    UpdateInterval: 60000,
}

export const MessageConfig = {
    GitHub: {
        ApiHost: 'https://api.github.com/',
        Repo: 'bmiddha/tempus',
        Features: ['contributors', 'issues', 'pulls'],
    },
    Slack: {
        ApiKeyName: 'slackbottoken',
        ApiHost: 'https://slack.com/api/',
    }
}

export const ClockConfig = {
    UpdateInterval: 1000,
}