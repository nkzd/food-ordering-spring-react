package org.mamba.donesi.domain;

import javax.validation.constraints.NotBlank;
import org.mamba.donesi.domain.Order;

public class OrderRequest {

	@NotBlank(message = "Orders are required")
	private Order[] basketState;

	@NotBlank(message = "Username is required")
	private Long restaurantId;

	@NotBlank(message = "Delivery address is required")
	private String deliveryAddress;

	public OrderRequest() {
		super();
	}

	public String getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
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
