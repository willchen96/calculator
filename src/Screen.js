import React, { useContext, useRef, useEffect } from "react"
import { KeyContext } from "./context/KeyContext"
import "./Screen.css"

export default function Screen() {
    const { equation } = useContext(KeyContext)
    const screenText = useRef()
    let displayedEqn = equation
    useEffect(() => {
        if (equation.length > 9) {
            screenText.current.style.fontSize = "25px"
        } else {
            screenText.current.style.fontSize = "45px"
        }
    }, [equation])
    console.log(equation)
    if (equation !== "") {
        if (equation.length > 16) {
            displayedEqn = equation.slice(-16)
        }
    }
    return (
        <div className="screen">
            <p className="screen-text" ref={screenText}>
                {displayedEqn}
            </p>
        </div>
    )
}
