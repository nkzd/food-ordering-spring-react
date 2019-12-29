package org.mamba.donesi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class FoodArticleIdException extends RuntimeException {

	public FoodArticleIdException(String message) {
		super(message);
	}

}
