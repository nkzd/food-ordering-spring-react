package org.mamba.donesi.services;

import javax.validation.Valid;

import org.mamba.donesi.domain.AppUser;
import org.mamba.donesi.exceptions.IdException;
import org.mamba.donesi.exceptions.NotInAccountException;
import org.mamba.donesi.exceptions.AlreadyExistsException;
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
		} catch (Exception e) {
			e.printStackTrace();
			throw new AlreadyExistsException("Username " + newAppUser.getUsername() + " already exists");
		}
	}

	public AppUser getByUsername(String username) {
		AppUser appUser = appUserRepository.getByUsername(username);
		if (appUser == null)
			throw new IdException("User with this id doesn't exist");
		return appUser;
	}

	public AppUser update(@Valid AppUser updateUser, String username) {
		if(updateUser.getId().equals(getByUsername(username).getId()))
		{
			try {
				updateUser.setPassword(bCryptPasswordEncoder.encode(updateUser.getPassword()));
				AppUser appUser = appUserRepository.save(updateUser);
				updateUser.setConfirmPassword("");
				return appUser;
			} catch (Exception e) {
				e.printStackTrace();
				throw new AlreadyExistsException("Username " + updateUser.getUsername() + " already exists");
			}
		}else {
			throw new NotInAccountException("Details not found in your account");
		}
	}
}
