package com.luiggibeats.util.excecao;

class ValidationErrorResponse {

	private BusinessExceptionCode code;
	private String message;

	public BusinessExceptionCode getCode() {
		return code;
	}

	public void setCode(BusinessExceptionCode code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
