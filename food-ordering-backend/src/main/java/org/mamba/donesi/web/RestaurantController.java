package org.mamba.donesi.web;

import java.security.Principal;

import javax.validation.Valid;

import org.mamba.donesi.domain.Category;
import org.mamba.donesi.domain.FoodArticle;
import org.mamba.donesi.domain.Restaurant;
import org.mamba.donesi.services.CategoryService;
import org.mamba.donesi.services.FoodArticleService;
import org.mamba.donesi.services.MapValidationErrorService;
import org.mamba.donesi.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/restaurant")
@CrossOrigin
public class RestaurantController {

	@Autowired
	private RestaurantService restaurantService;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private FoodArticleService foodArticleService;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@PostMapping("")
	public ResponseEntity<?> createNewRestaurant(@Valid @RequestBody Restaurant restaurant, BindingResult result,
			Principal principal) {
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;

		Restaurant newRestaurant = restaurantService.saveOrUpdateRestaurant(restaurant, principal.getName());

		return new ResponseEntity<Restaurant>(newRestaurant, HttpStatus.OK);
	}

	@GetMapping("/all")
	public Iterable<Restaurant> getAllRestaurants(Principal principal) {
		return restaurantService.findAllRestaurants(principal.getName());
	}

	@GetMapping("/{restaurantId}")
	public ResponseEntity<?> getRestaurantById(@PathVariable String restaurantId, Principal principal) {
		Restaurant restaurant = restaurantService.findRestaurantById(restaurantId, principal.getName());

		return new ResponseEntity<Restaurant>(restaurant, HttpStatus.OK);
	}

	@DeleteMapping("/{restaurantId}")
	public ResponseEntity<?> deleteRestaurantById(@PathVariable String restaurantId, Principal principal) {
		restaurantService.deleteRestaurantById(restaurantId, principal.getName());
		return new ResponseEntity<String>("Restaurant with ID" + restaurantId + " was deleted", HttpStatus.OK);
	}

	@GetMapping("/{restaurantId}/category/all")
	public Iterable<Category> getAllCategories(@PathVariable String restaurantId, Principal principal) {
		Restaurant restaurant = restaurantService.findRestaurantById(restaurantId, principal.getName());
		return categoryService.getAllCategories(restaurant);
	}

	@GetMapping("/{restaurantId}/category/{categoryId}")
	public ResponseEntity<?> getCategoryById(@PathVariable String restaurantId, @PathVariable String categoryId,
			Principal principal) {
		Restaurant restaurant = restaurantService.findRestaurantById(restaurantId, principal.getName());

		Category category = categoryService.getCategoryById(restaurant, categoryId);

		return new ResponseEntity<Category>(category, HttpStatus.OK);
	}

	@PostMapping("/{restaurantId}/category")
	public ResponseEntity<?> addCategoryToRestaurant(@PathVariable String restaurantId,
			@Valid @RequestBody Category category, BindingResult result, Principal principal) {
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;

		Category newCategory = restaurantService.addCategoryToRestaurant(restaurantId, category, principal.getName());

		return new ResponseEntity<Category>(newCategory, HttpStatus.OK);
	}

	@DeleteMapping("/{restaurantId}/category/{categoryId}")
	public ResponseEntity<?> deleteCategoryById(@PathVariable String restaurantId, @PathVariable String categoryId,
			Principal principal) {
		Restaurant restaurant = restaurantService.findRestaurantById(restaurantId, principal.getName());

		categoryService.deleteCategoryById(restaurant, categoryId);

		return new ResponseEntity<String>("Category with ID" + categoryId + " was deleted", HttpStatus.OK);
	}

	@GetMapping("/{restaurantId}/foodarticle/all")
	public Iterable<FoodArticle> getAllFoodArticles(@PathVariable String restaurantId, Principal principal) {
		Restaurant restaurant = restaurantService.findRestaurantById(restaurantId, principal.getName());
		return foodArticleService.getAllFoodArticles(restaurant);
	}

	@GetMapping("/{restaurantId}/foodarticle/{foodArticleId}")
	public ResponseEntity<?> getFoodArticleById(@PathVariable String restaurantId, @PathVariable String foodArticleId,
			Principal principal) {
		Restaurant restaurant = restaurantService.findRestaurantById(restaurantId, principal.getName());

		FoodArticle foodArticle = foodArticleService.getFoodArticleById(restaurant, foodArticleId);

		return new ResponseEntity<FoodArticle>(foodArticle, HttpStatus.OK);
	}

	@PostMapping("/{restaurantId}/foodarticle")
	public ResponseEntity<?> addFoodArticleToRestaurant(@PathVariable String restaurantId,
			@Valid @RequestBody FoodArticle foodArticle, BindingResult result, Principal principal) {
		
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;	
		
		FoodArticle newFoodArticle = restaurantService.addFoodArticleToRestaurant(restaurantId, foodArticle,
				principal.getName());

		return new ResponseEntity<FoodArticle>(newFoodArticle, HttpStatus.OK);
	}

	@DeleteMapping("/{restaurantId}/foodarticle/{foodArticleId}")
	public ResponseEntity<?> deleteFoodArticleById(@PathVariable String restaurantId,
			@PathVariable String foodArticleId, Principal principal) {
		Restaurant restaurant = restaurantService.findRestaurantById(restaurantId, principal.getName());

		foodArticleService.deleteFoodArticleById(restaurant, foodArticleId);

		return new ResponseEntity<String>("Food article with ID" + foodArticleId + " was deleted", HttpStatus.OK);
	}
}
