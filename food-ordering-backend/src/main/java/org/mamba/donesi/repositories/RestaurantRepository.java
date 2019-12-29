package org.mamba.donesi.repositories;

import java.util.List;

import org.mamba.donesi.domain.AdminUser;
import org.mamba.donesi.domain.Restaurant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface RestaurantRepository extends CrudRepository<Restaurant,Long>{
	
	List<Restaurant> findByAdminUser(AdminUser adminUser);
	
	List<Restaurant> findByAdminUser_Username(String username);
	
}
