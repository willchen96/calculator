import "./Keypad.css"
import Key from "./Key"
import React, { useCallback, useContext, useEffect } from "react"
import { KeyContext } from "./context/KeyContext"
import symbolConverter from "./symbolConverter"

let keys = ["AC", "/", "*", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", "=", "0", "."]
let operators = ["/", "*", "+", "-", "."]

const handleInput = (prev, input) => {
    if (prev === "") {
        if (input === "-") return input
        if (operators.includes(input) || input === "=") return ""
    }
    if (prev.length === 1 && prev === "-") {
        if (operators.includes(input) || input === "=") return prev
    }
    if (input === "AC") {
        return ""
    }
    const end = prev[prev.length - 1]
    if (input === "=") {
        if (operators.includes(end)) return prev

        let ans = eval(prev)
        let ansLength = ans.toString().length
        console.log("Raw ans: " + eval(prev) + "; Ans length: " + ansLength)
        if (ansLength > 16) {
            if (ans < 1e16) {
                console.log("Decimal ans len: " + ans.toString().slice(0, 16).length)
                return ans.toString().slice(0, 16)
            } else {
                if (ans >= 1e21) {
                    ansLength = Number(ans.toString().slice(-2)) + 1
                    ans = ans.toString().slice(0, 14).replace(".", "")
                }
                console.log("Ans: " + ans + "; Ans length: " + ansLength)
                const offset = (ansLength - 14 + (ansLength - 14).toString().length).toString().length
                console.log(offset)

                return ans.toString().slice(0, 14 - offset) + `e+${ansLength - 14 + offset}`
            }
        }
        return ans.toString()
    }

    if (operators.includes(input)) {
        if (input === "-") {
            if (end === "-") {
                return prev.slice(0, -1) + "+"
            } else {
                return prev + input
            }
        } else {
            if (operators.includes(end)) {
                if (operators.includes(prev[prev.length - 2])) {
                    return prev.slice(0, -2) + input
                }
                return prev.slice(0, -1) + input
            }
        }
    }

    console.log(prev + input)
    return prev + input
}
const handleKeyUp = function (input) {
    if (keys.includes(input) || input === "Enter" || input === "Clear") {
        let keyId = "#key-" + symbolConverter(input)
        document.querySelector(keyId).classList.remove("key-active")
    }
}

const handleKeyDown = function (input, updateEquation) {
    if (keys.includes(input) || input === "Enter" || input === "Clear") {
        if (input === "Enter") input = "="
        if (input === "Clear") input = "AC"

        updateEquation(input)

        let keyId = "#key-" + symbolConverter(input)
        document.querySelector(keyId).classList.add("key-active")
    }
}

export default function Keypad() {
    const { setEquation } = useContext(KeyContext)

    const updateEquation = useCallback(
        function (input) {
            setEquation(prev => handleInput(prev, input))
        },
        [setEquation]
    )

    useEffect(() => {
        document.addEventListener("keydown", e => handleKeyDown(e.key, updateEquation))
        document.addEventListener("keyup", e => handleKeyUp(e.key))
    }, [updateEquation])

    return (
        <div className="Keypad">
            {keys.map(key => (
                <Key key={key} input={key} updateEquation={updateEquation} symbolConverter={symbolConverter} />
            ))}
        </div>
    )
}
