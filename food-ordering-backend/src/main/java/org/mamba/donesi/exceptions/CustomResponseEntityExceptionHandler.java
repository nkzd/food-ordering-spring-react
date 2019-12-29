package org.mamba.donesi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler{

	@ExceptionHandler
    public final ResponseEntity<Object> handleUsernameAlreadyExists(UsernameAlreadyExistsException ex, WebRequest request){
    	UsernameAlreadyExistsResponse exceptionResponse = new UsernameAlreadyExistsResponse(ex.getMessage());
    	return new ResponseEntity(exceptionResponse,HttpStatus.BAD_REQUEST);
    }
	@ExceptionHandler
    public final ResponseEntity<Object> handleRestaurantNotFoundException(RestaurantNotFoundException ex, WebRequest request){
		RestaurantNotFoundResponse exceptionResponse = new RestaurantNotFoundResponse(ex.getMessage());
    	return new ResponseEntity(exceptionResponse,HttpStatus.BAD_REQUEST);
    }
	@ExceptionHandler
    public final ResponseEntity<Object> handleRestaurantIdException(RestaurantIdException ex, WebRequest request){
		RestaurantIdResponse exceptionResponse = new RestaurantIdResponse(ex.getMessage());
    	return new ResponseEntity(exceptionResponse,HttpStatus.BAD_REQUEST);
    }
	
	@ExceptionHandler
    public final ResponseEntity<Object> handleCategoryIdException(CategoryIdException ex, WebRequest request){
		CategoryIdResponse exceptionResponse = new CategoryIdResponse(ex.getMessage());
    	return new ResponseEntity(exceptionResponse,HttpStatus.BAD_REQUEST);
    }
	@ExceptionHandler
    public final ResponseEntity<Object> handleFoodArticleIdException(FoodArticleIdException ex, WebRequest request){
		FoodArticleIdResponse exceptionResponse = new FoodArticleIdResponse(ex.getMessage());
    	return new ResponseEntity(exceptionResponse,HttpStatus.BAD_REQUEST);
    }
	
}
