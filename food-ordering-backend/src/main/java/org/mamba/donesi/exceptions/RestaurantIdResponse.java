package org.mamba.donesi.exceptions;

public class RestaurantIdResponse {
	private String RestaurantId;

	public RestaurantIdResponse(String restaurantId) {
		super();
		RestaurantId = restaurantId;
	}

	public String getRestaurantId() {
		return RestaurantId;
	}

	public void setRestaurantId(String restaurantId) {
		RestaurantId = restaurantId;
	}
	
}
