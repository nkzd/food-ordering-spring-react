package org.mamba.donesi.exceptions;

public class CategoryIdResponse {
	private String categoryId;

	public CategoryIdResponse(String categoryId) {
		super();
		this.categoryId = categoryId;
	}

	public String getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}

}
