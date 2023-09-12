import  { FC, useEffect, useState } from 'react';
import { DaysShortNames, MonthShortNames } from '../models/Date';
import { ClockConfig } from '../util/Config';

const Clock: FC = () => {
    const [now, setNow] = useState<Date>(new Date());


    useEffect(() => {
        const update = () => { setNow(new Date()) };
        update();
        const updateInterval = setInterval(update, ClockConfig.UpdateInterval);
        return (() => {
            clearInterval(updateInterval);
        });
    }, []);

    const t_h = now.getHours();
    const t_m = now.getMinutes();
    const t_s = now.getSeconds();

    const d_d = DaysShortNames[now.getDay()];
    const d_m = MonthShortNames[now.getMonth()];
    const d_dt = now.getDate();

    return (
        <>
            <h1>
                {(t_h % 12 === 0) ? '12' : (t_h % 12).toString().padStart(2, '0')}:
                    {(t_m).toString().padStart(2, '0')}:
                    {(t_s).toString().padStart(2, '0')} {t_h < 12 ? 'AM' : 'PM'}
            </h1>
            <h2>{d_d}, {d_m} {d_dt}</h2>
        </>
    );
}

export default Clock;
