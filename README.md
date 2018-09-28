# Uptown Stream State

**High-Performance React State Management**

Uptown Stream state uses event streaming across components, radically reducing the complexity compared to other React state management frameworks, such as Redux. By streaming events, complex and annoying consumer/producer nesting is no longer required, and any component is liberated to emit or listen to state events.

Uptown Stream state connects easily to a remote websocket router such as Crossbar.io for one to many, and many to many state management needs, making Uptown very useful for gaming and currency exchange functionality. 

## Getting Started

### 1. Create an uptown folder in your react project src:

```
/src
    ...
    /uptown
       example.js
       index.js
    App.js
    index.js
    ...
```

### 2. Install the uptown module:

```
npm i -D react-uptown
```

### 3. Create an index file to export Uptown and event functions.

The base uptown index must always export the Uptown object as default. The uptown index will also contain event functions that can be imported anywhere in the application to update state.

**uptown/index.js**
```javascript
import { UptownStream } from 'react-uptown'

const Uptown = new UptownStream()

export default Uptown

export const changeMessage = (msg) =>
    Uptown.emit('example-event', { event: 'change-message', data: msg })

```

### 4. Start by defining the strucutre of the uptown state file.

Uptown should include the following:

- **StateModel**
- **constructor**
- **start**
- **handle**
- **update**
- **upstream**
- **stats**

**uptown/example.js**
```javascript

// state model
export const ExampleState = {}

// constructor function
export default function Example () {}

// start, initializes the state
Example.prototype.start = function () {}

// handles events from emitters
Example.prototype.handle = function () {}

// updates state to listeners
Example.prototype.update = function () {}

// broadcasts state to upstream websockets
Example.prototype.upstream = function () {}

// debug logging
Example.prototype.stats = function () {}
```

That is the basic structure of an Uptown state object. All Uptown state files should include these methods as a matter of naming convention. Use prototyping instead of es6 class strucuture for performance.

### 5. You can now fill in the content of the uptown state file.

**uptown/example.js**
```javascript
// state model
export const ExampleState = {
    message: 'Moose Beaver'
}

// constructor function
export default function Example () {
    this.uptown = Uptown
    this.state = ExampleState
    this.start()
}

// start, initializes the state
Example.prototype.start = function () {
    // stick to this naming convention for
    // the main event for the state file
    // '{name of state object}-event'
    this.uptown.on('example-event', this.handle, this)
}

// Handle is a switch statement to handle events 
Example.prototype.handle = function (payload) {
    //  The payload of the state events
    //  must always follow this structure:
    // { event: 'change-message', data: 'Eagle Pig' }
    // These event functions live in uptown/index.js.
    // The handle switches between the event types and 
    // parses and updates the state accordingly with
    // any logic that is required.
    const { event, data } = payload
    switch(event) {
        case 'change-message': {
            // add middleware here to parse or transform
            // the data, or emit other events as needed.
            this.state.message = Object.assign(data)
            // Always return this.update() from switch cases.
            return this.update()
        }
        // switch statements require a default
        default: {
            return
        }
    }
}

// emits a state update event to listeners
Example.prototype.update = function () {
    this.uptown.emit('example-state', this.state)
    this.stats()
}

// listener/emits state to upstream websocket listeners
Example.prototype.upstream = function () {
    // TODO
}

// debug logging
Example.prototype.stats = function () {
    // always add your state events
    // here to test for memory leaks
    // and to have visibility
    console.log(
        'Example State\n',
        'state\n',
        this.state,
        'example-state\n',
        this.uptown.listeners('example-state'),
        'example-events\n',
        this.uptown.listeners('example-events'),
        
    )
}
```

### 6. After you have the uptown state completed, implement the state into React.

Start with App.js and add the following:

**src/App.js**
```javascript
import React, { Component } from 'react'

import Uptown, { changeMessage } from './uptown'
import Example, { ExampleState } from './uptown/example'

class App extends Component {

    constructor(props) {
        super(props)

        this.example = new Example(Uptown)
        this.state = { ExampleState }

        this.uptown = Uptown
        // create a listener function, and call
        // it using the format as follows:
        this.App_example_L1 = (ctx) => this.setState({ExampleState: ctx})
    }

    componentDidMount() {
        // we must add listeners to uptown for the 'example-state' events
        // always add 'this' context to the listener.
        this.uptown.addListener('example-state', this.App_example_L1, this)
    }

    componentWillUnmount() {
        // It's very important to remove the listener from uptown when 
        // the component unmounts to avoid memory leaks!
        this.uptown.removeListener('example-state', this.App_example_L1)
    }

    render() {
        return (
            <div>
                <p>{this.state.ExampleState.message}</p>

                <button onClick={() => changeMessage('EaglePig Soars!!!')}>
                  Eagle Pig
                </button>
                <button onClick={() => changeMessage('MooseBeaver stalks!!')}>
                  Moose Beaver
                </button>
            </div>
        )
    }
}





