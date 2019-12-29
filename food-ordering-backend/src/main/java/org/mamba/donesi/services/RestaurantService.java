package org.mamba.donesi.services;

import java.util.Optional;

import org.mamba.donesi.domain.AdminUser;
import org.mamba.donesi.domain.Category;
import org.mamba.donesi.domain.FoodArticle;
import org.mamba.donesi.domain.Restaurant;
import org.mamba.donesi.exceptions.CategoryIdException;
import org.mamba.donesi.exceptions.FoodArticleIdException;
import org.mamba.donesi.exceptions.RestaurantIdException;
import org.mamba.donesi.exceptions.RestaurantNotFoundException;
import org.mamba.donesi.repositories.AdminUserRepository;
import org.mamba.donesi.repositories.CategoryRepository;
import org.mamba.donesi.repositories.FoodArticleRepository;
import org.mamba.donesi.repositories.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantService {
	@Autowired
	private RestaurantRepository restaurantRepository;

	@Autowired
	private AdminUserRepository adminUserRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private FoodArticleRepository foodArticleRepository;
	
	@Autowired
	private CategoryService categoryService;

	public Iterable<Restaurant> findAllRestaurants(String username) {
		return restaurantRepository.findByAdminUser_Username(username);
	}

	public Restaurant findRestaurantById(String restaurantId, String username) {
		Optional<Restaurant> restaurant = restaurantRepository.findById(Long.parseLong(restaurantId));

		if (!restaurant.isPresent()) {
			throw new RestaurantIdException("Restaurant ID " + restaurantId + " does not exist");
		}
		if (!restaurant.get().getAdminUser().getUsername().equals(username)) {
			throw new RestaurantNotFoundException("Restaurant not found in your account");
		}

		return restaurant.get();
	}

	public Restaurant saveOrUpdateRestaurant(Restaurant restaurant, String username) {

		// update postavi email i ime
		if (restaurant.getId() != null) {
			Optional<Restaurant> existingRestaurant = restaurantRepository.findById(restaurant.getId());
			if (!existingRestaurant.isPresent()) {
				throw new RestaurantIdException("Restaurant ID " + restaurant.getId() + " does not exist");
			}

			if (!existingRestaurant.get().getAdminUser().getUsername().equals(username)) {
				throw new RestaurantNotFoundException("Restaurant not found in your account");
			}

		}

		try {
			AdminUser adminUser = adminUserRepository.findByUsername(username);
			restaurant.setAdminUser(adminUser);

			// ovo vraca NE perzistovan objekat? Cudno.
			return restaurantRepository.save(restaurant);
			// zbog flusha, created_at je na null
		} catch (Exception e) {
			throw new RestaurantIdException("Restaurant with this email already exists");
		}

	}

	public void deleteRestaurantById(String restaurantId, String username) {

		restaurantRepository.delete(findRestaurantById(restaurantId, username));
	}

	public Category addCategoryToRestaurant(String restaurantId, Category category, String username) {
		Restaurant restaurant = findRestaurantById(restaurantId, username);

		category.setRestaurant(restaurant);
		try {
			return categoryRepository.save(category);
		} catch (Exception e) {
			throw new CategoryIdException("Category with this id already exists");
		}

	}

	public FoodArticle addFoodArticleToRestaurant(String restaurantId, FoodArticle foodArticle, String username) {
		Restaurant restaurant = findRestaurantById(restaurantId, username);

		foodArticle.setRestaurant(restaurant);
		
		Category category = categoryService.getCategoryById(restaurant, foodArticle.getCategoryIdentifier().toString());
		foodArticle.setCategory(category);
		
		
		try {
			return foodArticleRepository.save(foodArticle);
		} catch (Exception e) {
			throw new FoodArticleIdException("Food article with this id already exists");
		}

	}
}
