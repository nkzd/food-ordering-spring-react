package org.mamba.donesi.services;

import org.mamba.donesi.domain.AppUser;
import org.mamba.donesi.domain.UserInfo;
import org.mamba.donesi.exceptions.AlreadyExistsException;
import org.mamba.donesi.exceptions.NotInAccountException;
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

		// on update, check if to-be-updated userInfo is in the account
		if (userInfo.getId() != null) {
			if (appUser.getUserInfo().getId() != userInfo.getId())
				throw new NotInAccountException("User info with this id not found in account");
		}

		userInfo.setAppUser(appUser);
		try {
			UserInfo newUserInfo = userInfoRepository.save(userInfo);
			return newUserInfo;
		} catch (Exception e) {
			throw new AlreadyExistsException("User info already exists, try updating instead.");
		}

	}

	public UserInfo getUserInfo(AppUser appuser) {

		return appuser.getUserInfo();
	}

}
