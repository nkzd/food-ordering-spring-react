package org.mamba.donesi.domain;

import javax.validation.constraints.NotBlank;
import org.mamba.donesi.domain.Order;
public class OrderRequest {
	
	
	@NotBlank(message = "orders are required")
	private Order[] basketState;
	
	@NotBlank(message = "username is required")
	private Long restaurantId;

	public OrderRequest() {
		super();
	}
	public Order[] getBasketState() {
		return basketState;
	}

	public void setBasketState(Order[] basketState) {
		this.basketState = basketState;
	}

	public Long getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(Long restaurantId) {
		this.restaurantId = restaurantId;
	}
	
	
	
}
