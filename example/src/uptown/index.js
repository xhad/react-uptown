import { UptownStream } from 'react-uptown'

const Uptown = new UptownStream()

export default Uptown

// Example Events
export const changeMessage = (msg) => {
    Uptown.emit('example-event', { event: 'change-message', data: msg })
}


// Auth Events
// ... add other uptown state object events
