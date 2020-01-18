package org.mamba.donesi.services;

import org.mamba.donesi.domain.AppUser;
import org.mamba.donesi.exceptions.IdException;
import org.mamba.donesi.exceptions.IdNotInAccountException;
import org.mamba.donesi.exceptions.UsernameAlreadyExistsException;
import org.mamba.donesi.repositories.AppUserRepository;
import org.mamba.donesi.repositories.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AppUserService {
	@Autowired
	private AppUserRepository appUserRepository;
	
	@Autowired
	private UserInfoRepository userInfoRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public AppUser save(AppUser newAppUser) {
		try {
			newAppUser.setPassword(bCryptPasswordEncoder.encode(newAppUser.getPassword()));
			AppUser appUser = appUserRepository.save(newAppUser);
			newAppUser.setConfirmPassword("");
			return appUser;
		}catch(Exception e) {
			throw new UsernameAlreadyExistsException("Username " + newAppUser.getUsername() + " already exists");
		}
	}
	public AppUser getByUsername(String username) {
		AppUser appUser = appUserRepository.getByUsername(username);
		if(appUser==null)
			throw new IdException("User with this id doesn't exist");
		return appUser;
	}
}
