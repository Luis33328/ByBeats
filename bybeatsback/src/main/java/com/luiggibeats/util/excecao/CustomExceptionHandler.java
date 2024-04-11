package com.luiggibeats.util.excecao;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class CustomExceptionHandler {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(BusinessException.class)
    public final ValidationErrorResponse handleAllBusinessExceptions(BusinessException ex, WebRequest request) {
		ValidationErrorResponse error = new ValidationErrorResponse();
		error.setCode(ex.getCode());
		error.setMessage(ex.getMessage());
        return error;
    }
	
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
    public final ValidationErrorResponse handleUsernameNotFound(MethodArgumentNotValidException ex, WebRequest request) {
		ValidationErrorResponse error = new ValidationErrorResponse();
		error.setCode(BusinessExceptionCode.ARGUMENTO_INVALIDO);
		error.setMessage(BusinessExceptionCode.ARGUMENTO_INVALIDO.getMessage());
        return error;
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(Exception.class)
    public final ValidationErrorResponse handleAllExceptions(Exception ex, WebRequest request) {
		ValidationErrorResponse error = new ValidationErrorResponse();
		error.setCode(BusinessExceptionCode.ERRO_INDEFINIDO);
		error.setMessage(ex.getMessage());
        return error;
    }

}
