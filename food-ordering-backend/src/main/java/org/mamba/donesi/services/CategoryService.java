package org.mamba.donesi.services;

import java.util.List;

import org.mamba.donesi.domain.Category;
import org.mamba.donesi.domain.Restaurant;
import org.mamba.donesi.exceptions.IdException;
import org.mamba.donesi.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
	@Autowired
	private CategoryRepository categoryRepository;

	public void deleteCategoryById(Restaurant restaurant, String categoryId) {
		List<Category> categories = restaurant.getCategories();

		Category category = categories.stream().filter(aCategory -> categoryId.equals(aCategory.getId().toString()))
				.findFirst().orElse(null);

		if (category == null) {
			throw new IdException("Category with this id doesn't exist");
		}
		categoryRepository.delete(category);
	}

	public List<Category> getAllCategories(Restaurant restaurant) {
		return categoryRepository.findByRestaurant(restaurant);
	}

	public Category getCategoryById(Restaurant restaurant, String categoryId) {
		List<Category> categories = restaurant.getCategories();

		Category category = categories.stream().filter(aCategory -> categoryId.equals(aCategory.getId().toString()))
				.findFirst().orElse(null);

		if (category == null) {
			throw new IdException("Category with this id doesn't exist");
		}
		return category;
	}
}
