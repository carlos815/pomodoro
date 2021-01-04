Notification.requestPermission(function (status) {
  console.log('Notification permission status:', status)
})

export const displayNotification = (text) => {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      reg.showNotification(text)
    })
  }
}
