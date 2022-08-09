export default function serviceWorker() {
    const serviceWorkerURL = `${process.env.PUBLIC_URL}/service-worker.js`
    navigator.serviceWorker.register(serviceWorkerURL)
        .then(response => console.log('Service workers enabled!'))
        .catch(error => console.log('Unable to enable workers!'))
}