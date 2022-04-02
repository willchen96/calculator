import "./App.css"
import Screen from "./Screen"
import Keypad from "./Keypad"
import { KeyProvider } from "./context/KeyContext"

function App() {
    return (
        <div className="App">
            <div className="background"></div>
            <div className="body">
                <KeyProvider>
                    <Screen />
                    <Keypad />
                </KeyProvider>
            </div>
        </div>
    )
}

export default App
