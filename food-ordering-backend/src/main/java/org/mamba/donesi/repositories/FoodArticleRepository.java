package org.mamba.donesi.repositories;

import java.util.List;

import org.mamba.donesi.domain.Category;
import org.mamba.donesi.domain.FoodArticle;
import org.mamba.donesi.domain.Restaurant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodArticleRepository extends CrudRepository<FoodArticle, Long> {
	public List<FoodArticle> findByRestaurant(Restaurant restaurant);

	public List<FoodArticle> findByRestaurant_Id(Long id);

	public List<FoodArticle> findByCategory(Category category);

	public List<FoodArticle> findByCategory_Id(Long id);

}
