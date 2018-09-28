
export const ExampleState = {
    message: 'EaglePig roaars!!!'
}

export default function Example (uptown) {
    this.uptown = uptown
    this.state = ExampleState
    this.start()
}

Example.prototype.start = function () {
    this.uptown.on('example-event', this.handle, this)
}

Example.prototype.handle = function (payload) {

    const { event, data } = payload
    switch(event) {
        case 'change-message': {
            this.state = Object.assign(this.state, {message: data})
            return this.update()
        }

        default: {
            return
        }
    }
}

Example.prototype.update = function () {
    this.uptown.emit('example-state', this.state)
    this.stats()
}

Example.prototype.stats = function () {
    console.log(
        'Example State',
        '\n',
        'state:',
        '\n',
        this.state,
        '\n',
        'example-event',
        '\n',
        this.uptown.listeners('example-event'),
        '\n',
        'example-state',
        '\n',
        this.uptown.listeners('example-state')

    )
}



