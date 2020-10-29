import { FoxApiService } from '../services'

const foxApi = new FoxApiService();

const getNotifications = ({ signal = null }) => {
  return dispatch => {
    foxApi.getEntityList('notifications', null, signal)
      .then(data => {
        if (data.length > 0) {
          dispatch(refreshNotificationList(data))
        }
      })
      .catch(function (error) {
        console.error(error);
      })
  }
}

const clearNotifications = () => {
  return dispatch => {
    dispatch(refreshNotificationList({}))
  }
}

const readNotification = id => {
  return dispatch => {
    foxApi.patchEntityOf('notifications', id, { unread: false })
      .then(data => {
        if (data.id) {
          dispatch(setNotificationAsRead(data))
        }
      })
  }
}

const refreshNotificationList = notifications => ({
  type: 'REFRESH_NOTIFICATION_LIST',
  notifications: notifications
})

const setNotificationAsRead = notification => ({
  type: 'READ_NOTIFICATION',
  notification: notification
})

export { getNotifications, clearNotifications, readNotification }
