import type { NotificationPlacement } from 'antd/es/notification';
import {notification} from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error'
export const openNotification = (type:NotificationType = "error", placement: NotificationPlacement, error: string | null) => {
    notification[type]({
        message: `Проверьте правильность вводимых данных`,
        description: error,
        placement,
        duration: 3
    });
};