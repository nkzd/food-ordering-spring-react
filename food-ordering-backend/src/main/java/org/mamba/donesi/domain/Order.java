package org.mamba.donesi.domain;

import javax.validation.constraints.NotBlank;

public class Order {
	
	@NotBlank(message = "id is required")
	private Long id;
	
	@NotBlank(message = "food article is required")
	private FoodArticle foodArticle;
	
	private String orderNote;
	
	@NotBlank(message = "quantity is required")
	private Long quantity;

	public Order() {
		super();
	}

	public Order(@NotBlank(message = "id is required") Long id,
			@NotBlank(message = "food article is required") FoodArticle foodArticle, String orderNote,
			@NotBlank(message = "quantity is required") Long quantity) {
		super();
		this.id = id;
		this.foodArticle = foodArticle;
		this.orderNote = orderNote;
		this.quantity = quantity;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public FoodArticle getFoodArticle() {
		return foodArticle;
	}

	public void setFoodArticle(FoodArticle foodArticle) {
		this.foodArticle = foodArticle;
	}

	public String getOrderNote() {
		return orderNote;
	}

	public void setOrderNote(String orderNote) {
		this.orderNote = orderNote;
	}

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}

	@Override
	public String toString() {
		return "Order [foodArticle=" + foodArticle.getName() + ", orderNote=" + orderNote + ", quantity=" + quantity + "]";
	}
	
	public String toEmailTemplate() {
		return "Food Article: " + foodArticle.getName() + ", quantity: " + quantity + ". Order note: " + orderNote + "\n";
	}
	
}
