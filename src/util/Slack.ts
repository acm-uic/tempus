import { MessageConfig } from './Config';
import { GetUserConfig } from './UserConfig';

const token = GetUserConfig({ name: MessageConfig.Slack.ApiKeyName });
export const UserInfo = async (userId: string) => await (await fetch(`https://slack.com/api/users.info?user=${userId}&token=${token}`)).json();
export const RtmConnect = async () => await (await fetch(`${MessageConfig.Slack.ApiHost}/rtm.connect?token=${token}`)).json();
