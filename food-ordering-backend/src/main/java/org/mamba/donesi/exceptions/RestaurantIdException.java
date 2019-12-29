package org.mamba.donesi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RestaurantIdException extends RuntimeException {

	public RestaurantIdException(String message) {
		super(message);
	}
	
}
