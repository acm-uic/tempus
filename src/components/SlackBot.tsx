import React, { FC, useEffect, useState } from 'react';
import * as Slack from '../util/Slack';

const SlackBot: FC = () => {

    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const connect = async () => {
            const rtm = await Slack.RtmConnect();
            if (rtm.ok) {
                const ws = new WebSocket((await Slack.RtmConnect()).url);
                ws.onmessage = async (e) => {
                    const data = JSON.parse(e.data);
                    console.log(data);
                    switch (data.type) {
                        case 'hello':
                            console.log('ws hello');
                            break;
                        case 'message':
                            const userInfo = await Slack.UserInfo(data.user);
                            setMessage(`${userInfo.user.real_name} said ${data.text}`);
                            break;
                        case 'user_typing':
                            break;
                        case 'message_changed':
                            break;
                        default:
                            break;
                    };
                }
            }
        };
        connect();
    }, []);

    return (
        <h2>
            {message}
        </h2>
    );
}

export default SlackBot;
