class ApiError {
    constructor(code, message, from = null, params = null) {
        // Convert message and from to strings (so no [object Object])
        this.code = code;
        this.message = typeof message === "object" ? JSON.stringify(message) : message;
        this.from = typeof from === "object" ? JSON.stringify(from) : from;
        this.params = params;
    }

    static forbidden(msg, from, params) {
        return new ApiError(403, msg, from, params);
    }

    static unauthorized(msg, from, params) {
        return new ApiError(401, msg, from, params);
    }

    static badRequest(msg, from, params) {
        return new ApiError(400, msg, from, params);
    }

    static notFound(msg, from, params) {
        return new ApiError(404, msg, from, params);
    }

    static internal(msg, from) {
        return new ApiError(500, msg, from);
    }

    // 👇 Add this helper to send error response directly
    send(res) {
        return res.status(this.code).json({
            success: false,
            error: {
                code: this.code,
                message: this.message,
                from: this.from,
                params: this.params,
            },
        });
    }
}

export default ApiError;
