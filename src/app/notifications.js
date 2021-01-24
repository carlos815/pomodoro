export const requestNotificationPermition = () => {
  Notification.requestPermission(function (status) {
    console.log('Notification permission status:', status)
  })
}

export const displayNotification = (text) => {
  if (Notification.permission === 'granted') {
    new Notification(text, {
      icon: '../assets/images/logo192.png',
    })
  }
}
