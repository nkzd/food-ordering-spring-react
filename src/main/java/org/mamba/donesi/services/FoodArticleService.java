package org.mamba.donesi.services;

import java.util.List;

import org.mamba.donesi.domain.FoodArticle;
import org.mamba.donesi.domain.Restaurant;
import org.mamba.donesi.exceptions.IdException;
import org.mamba.donesi.repositories.FoodArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FoodArticleService {
	@Autowired
	FoodArticleRepository foodArticleRepository;

	public List<FoodArticle> getAllFoodArticles(Restaurant restaurant) {
		List<FoodArticle> allFoodArticles = foodArticleRepository.findByRestaurant(restaurant);
		allFoodArticles.stream().forEach(foodArticle -> {
			foodArticle.setCategoryIdentifier(foodArticle.getCategory().getId());
		});

		return allFoodArticles;
	}

	public FoodArticle getFoodArticleById(Restaurant restaurant, String foodArticleId) {
		List<FoodArticle> foodArticles = foodArticleRepository.findByRestaurant(restaurant);

		FoodArticle foodArticle = foodArticles.stream()
				.filter(aFoodArticle -> foodArticleId.equals(aFoodArticle.getId().toString())).findFirst().orElse(null);

		if (foodArticle == null) {
			throw new IdException("Food Article with this id doesn't exist");
		}

		foodArticle.setCategoryIdentifier(foodArticle.getCategory().getId());
		return foodArticle;
	}

	public void deleteFoodArticleById(Restaurant restaurant, String foodArticleId) {
		List<FoodArticle> foodArticles = foodArticleRepository.findByRestaurant(restaurant);

		FoodArticle foodArticle = foodArticles.stream()
				.filter(aFoodArticle -> foodArticleId.equals(aFoodArticle.getId().toString())).findFirst().orElse(null);

		if (foodArticle == null) {
			throw new IdException("Food Article with this id doesn't exist");
		}
		foodArticleRepository.delete(foodArticle);

	}

}
