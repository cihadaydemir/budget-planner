// Updated Eden error type to match the actual structure
type EdenError = {
	status: unknown;
	value: unknown;
};

// Updated Eden response type
type EdenResponse<T> = {
	data: T;
	error: EdenError | null;
	response: Response;
	status: number;
	headers: HeadersInit | undefined;
};
// Updated extract function to handle Eden's response type
export const extractData = async <T>(promise: Promise<EdenResponse<T>>): Promise<T> => {
	const response = await promise;
	if (response.error) {
		throw new Error(response.error.toString());
	}
	return response.data;
};
