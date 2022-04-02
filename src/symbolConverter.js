export default function (input) {
    switch (input) {
        case "+/-":
            return "sign"
        case "%":
            return "percentage"
        case "/":
            return "divide"
        case "-":
            return "minus"
        case "+":
            return "plus"
        case ".":
            return "decimal"
        case "=":
            return "equal"
        case "Enter":
            return "equal"
        case "Clear":
            return "AC"
        case "*":
            return "multiply"
        default:
            return input
    }
}
