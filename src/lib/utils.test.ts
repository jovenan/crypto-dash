import '@testing-library/jest-dom'
import { formatCurrency, formatPercentage, debounce } from "./utils"

jest.useFakeTimers();

describe("formatCurrency", () => {
    it("should format currency correctly", () => {
        expect(formatCurrency(1000)).toBe("$1,000.00")
    })

    it("should format currency correctly with decimal places", () => {
        expect(formatCurrency(1000.5)).toBe("$1,000.50")
    })
})

describe("formatPercentage", () => {
    it("should format percentage correctly", () => {
        expect(formatPercentage(10)).toBe("10.00%")
    })

    it("should format percentage correctly with decimal places", () => {
        expect(formatPercentage(10.5)).toBe("10.50%")
    })
})

describe("debounce", () => {
    it("should debounce function", () => {
        const func = jest.fn()
        const debouncedFunc = debounce(func, 100)

        debouncedFunc()
        debouncedFunc()
        debouncedFunc()

        expect(func).toHaveBeenCalledTimes(0)

        jest.advanceTimersByTime(100)

        expect(func).toHaveBeenCalledTimes(1)
    })

    it("should pass the latest arguments", () => {
        const func = jest.fn()
        const debouncedFunc = debounce(func, 100)

        debouncedFunc("a")
        debouncedFunc("b")

        jest.advanceTimersByTime(100)

        expect(func).toHaveBeenCalledWith("b")
    })
})
