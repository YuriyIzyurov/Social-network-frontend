import {openNotification} from "utils/notifications/notificationTop";

export const checkChangePossibility = (id:string | null, callback: () => void) => {
    if(id === '632cdb030d3cd7f0d9539401' || id ==='632cd9e70d3cd7f0d95393f8' ) {
        openNotification("error","top", null, "Эту статью изменить нельзя ")
    } else {
        callback()
    }
}