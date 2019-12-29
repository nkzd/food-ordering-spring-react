package org.mamba.donesi.exceptions;

public class FoodArticleIdResponse {
	private String foodArticleId;

	public FoodArticleIdResponse(String foodArticleId) {
		super();
		this.foodArticleId = foodArticleId;
	}

	public String getFoodArticleId() {
		return foodArticleId;
	}

	public void setFoodArticleId(String foodArticleId) {
		this.foodArticleId = foodArticleId;
	}
	
}
