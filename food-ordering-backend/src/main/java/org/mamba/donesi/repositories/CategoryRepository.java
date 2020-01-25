package org.mamba.donesi.repositories;

import java.util.List;

import org.mamba.donesi.domain.Category;
import org.mamba.donesi.domain.Restaurant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {
	List<Category> findByRestaurant(Restaurant restaurant);

	List<Category> findByRestaurant_Id(Long id);

}
