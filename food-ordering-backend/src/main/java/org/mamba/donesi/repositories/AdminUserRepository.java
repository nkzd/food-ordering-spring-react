package org.mamba.donesi.repositories;

import org.mamba.donesi.domain.AdminUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface AdminUserRepository extends CrudRepository<AdminUser,Long>{
	public AdminUser findByUsername(String username);
	public AdminUser getById(Long id);
}
