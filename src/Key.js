import React from "react"
import "./Key.css"
import symbolConverter from "./symbolConverter"

export default function Key({ input, updateEquation, symbolConverter }) {
    let keyId = "key-" + symbolConverter(input)

    return (
        <div id={keyId} className="Key" onClick={() => updateEquation(input)}>
            {input}
        </div>
    )
}
