
export const ExampleState = {
    message: 'EaglePig roaars!!!'
}

export default function Example (uptown) {
    this.uptown = uptown
    this.state = ExampleState
    this.start()
}

Example.prototype.start = function () {
    console.log('ok')
    this.uptown.on('game-event', this.handle, this)
}

Example.prototype.handle = function (payload) {
    console.log('ok')

    const { event, data } = payload
    switch(event) {
        case 'change-message': {
            this.state.message = Object.assign(this.state.message, data)
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
        'Example State\n',
        'state:\n',
        this.state,
        'example-event\n',
        this.uptown.listeners('example-event'),
        'example-state\n',
        this.uptown.listeners('example-state')

    )
}



