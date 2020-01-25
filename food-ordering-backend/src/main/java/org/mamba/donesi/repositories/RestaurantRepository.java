package org.mamba.donesi.repositories;

import java.util.List;

import org.mamba.donesi.domain.AppUser;
import org.mamba.donesi.domain.Restaurant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends CrudRepository<Restaurant, Long> {

	public List<Restaurant> findByAppUser(AppUser appUser);

	public List<Restaurant> findByAppUser_Username(String username);

	public Restaurant getById(Long id);

}
