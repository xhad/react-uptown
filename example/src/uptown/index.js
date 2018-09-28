import Uptown from 'react-uptown'


export default new Uptown()


uptown.on('test', console.log)
uptown.emit('test', 'test')
// Example Events
export const changeMessage = (msg) => 
    uptown.emit('example-event', { event: 'change-message', data: msg })


// Auth Events
// ... add other uptown state object events
