import React, { PureComponent } from 'react';
import * as Slack from '../util/Slack';

interface MessageState {
    message: string;
}

class Message extends PureComponent<{}, MessageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            message: '',
        };
    }

    SlackBot = async () => {
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
                        this.setState({ message: `${userInfo.user.real_name} said ${data.text}` });
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


    componentDidMount() {
        this.SlackBot();
    }

    render = () => (<>{this.state.message}</>);
}

export default Message;
