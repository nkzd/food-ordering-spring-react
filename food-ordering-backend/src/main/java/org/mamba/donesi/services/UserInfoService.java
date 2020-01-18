package org.mamba.donesi.services;

import org.mamba.donesi.domain.AppUser;
import org.mamba.donesi.domain.UserInfo;
import org.mamba.donesi.exceptions.IdException;
import org.mamba.donesi.exceptions.IdNotInAccountException;
import org.mamba.donesi.exceptions.RestaurantIdException;
import org.mamba.donesi.repositories.AppUserRepository;
import org.mamba.donesi.repositories.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {
	
	@Autowired
	private UserInfoRepository userInfoRepository;
	
	@Autowired
	private AppUserRepository appUserRepository;

	public UserInfo saveOrUpdateUserInfo(AppUser appUser, UserInfo userInfo) {
		
		//on update, check if to-be-updated userInfo is in the account
		if(userInfo.getId() !=null) {
			if(appUser.getUserInfo().getId()!=userInfo.getId())
				throw new IdNotInAccountException("User info with this id not found in account");
		}

		userInfo.setAppUser(appUser);
		try {
			UserInfo newUserInfo = userInfoRepository.save(userInfo);
			return newUserInfo;
		}catch (Exception e) {
			throw new IdException("User info already exists, try updating instead.");
		}
		
		
	}

	public UserInfo getUserInfo(AppUser appuser) {
		
		return appuser.getUserInfo();
	}
	
}
