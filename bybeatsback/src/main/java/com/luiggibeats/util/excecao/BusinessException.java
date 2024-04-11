package com.luiggibeats.util.excecao;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BusinessException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	private final BusinessExceptionCode code;

	public BusinessException(BusinessExceptionCode code) {
		super(code.getMessage());
		this.code = code;
	}

	public BusinessExceptionCode getCode() {
		return code;
	}

}

