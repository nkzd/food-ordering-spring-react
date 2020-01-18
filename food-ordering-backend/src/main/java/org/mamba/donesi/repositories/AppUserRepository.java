package org.mamba.donesi.repositories;

import org.mamba.donesi.domain.AppUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface AppUserRepository extends CrudRepository<AppUser,Long>{
	public AppUser findByUsername(String username);
	public AppUser getById(Long id);
	public AppUser getByUsername(String username);
}
