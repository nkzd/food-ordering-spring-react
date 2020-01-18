package org.mamba.donesi.repositories;

import java.util.List;

import org.mamba.donesi.domain.AppUser;
import org.mamba.donesi.domain.UserInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInfoRepository extends CrudRepository<UserInfo,Long>{
	List<UserInfo> findByAppUser(AppUser appUser);

	List<UserInfo> findByAppUser_Id(Long id);
}
