import type { NotificationPlacement } from 'antd/es/notification';
import {notification} from 'antd';


export const openNotification = (placement: NotificationPlacement, error: string) => {
    notification.info({
        message: `Проверьте правильность вводимых данных`,
        description: error,
        placement,
    });
};