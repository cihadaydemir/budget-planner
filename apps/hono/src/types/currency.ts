export type ExchangeRateResponse = {
	result: string
	documentation: string
	terms_of_use: string
	time_last_update_unix: number
	time_last_update_utc: string
	time_next_update_unix: number
	time_next_update_utc: string
	base_code: string
	conversion_rates: {
		[currencyCode: string]: number
	}
}

export type ExchangeRateErrorResponse = {
	result: "error"
	"error-type":
		| "unsupported-code"
		| "malformed-request"
		| "invalid-key"
		| "inactive-account"
		| "quota-reached"
		| "unknown-code"
}

export function isExchangeRateResponse(
	response: ExchangeRateResponse | ExchangeRateErrorResponse,
): response is ExchangeRateResponse {
	return (response as ExchangeRateResponse).result === "success"
}
