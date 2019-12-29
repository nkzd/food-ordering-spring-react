package org.mamba.donesi.exceptions;

public class RestaurantNotFoundResponse {
	private String RestaurantNotFound;

	public RestaurantNotFoundResponse(String restaurantNotFound) {
		super();
		RestaurantNotFound = restaurantNotFound;
	}

	public String getRestaurantNotFound() {
		return RestaurantNotFound;
	}

	public void setRestaurantNotFound(String restaurantNotFound) {
		RestaurantNotFound = restaurantNotFound;
	}
	
}
