import { isExchangeRateResponse, type ExchangeRateErrorResponse, type ExchangeRateResponse } from "../types/currency"

import type { AppContext } from ".."
import { HTTPException } from "hono/http-exception"
import { Hono } from "hono"

export const currenyRateRoutes = new Hono<AppContext>().get("/:baseCurrency", async (c) => {
	const baseCurrency = c.req.param("baseCurrency")
	const currentCurrencyRatesURL = new URL(
		`${c.env.EXCHANGE_RATE_API_URL}/${c.env.EXCHANGE_RATE_API_KEY}/latest/${baseCurrency}`,
	)
	const response = await fetch(currentCurrencyRatesURL)
	if (!response.ok) {
		throw new HTTPException(500, { message: "Failed to fetch currency rates" })
	}
	const data = (await response.json()) as ExchangeRateResponse | ExchangeRateErrorResponse
	if (!isExchangeRateResponse(data)) {
		throw new HTTPException(500, { message: data["error-type"] })
	}
	return c.json(data)
})
