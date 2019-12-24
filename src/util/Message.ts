import { MessageConfig } from './Config';
import { GetUserConfig } from './UserConfig';

export const getStats = async () => {
    const res = await (await fetch(`https://slack.com/api/conversations.list?token=${GetUserConfig({ name: MessageConfig.Slack.ApiKeyName })}`)).json();
    console.log(res);
}

export const SlackBot = async () => {
    await getStats();
    const ws = new WebSocket((await (await
        fetch(`${MessageConfig.Slack.ApiHost}/rtm.connect?token=${GetUserConfig({ name: MessageConfig.Slack.ApiKeyName })}`))
        .json()).url);
    ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        switch (data.type) {
            case 'hello':
                console.log('ws hello');
                break;
            case 'message':
                console.log('ws message');
                break;
            case 'user_typing':
                console.log('ws usertyping');
                break;
            case 'message_changed':
                console.log('ws changed');
                break;
        };
    }
};
