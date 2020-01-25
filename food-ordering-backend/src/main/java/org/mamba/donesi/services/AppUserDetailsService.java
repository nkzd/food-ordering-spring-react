package org.mamba.donesi.services;

import org.mamba.donesi.domain.AppUser;
import org.mamba.donesi.repositories.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AppUserDetailsService implements UserDetailsService {

	@Autowired
	private AppUserRepository appUserRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		AppUser appUser = appUserRepository.findByUsername(username);
		if (appUser == null)
			throw new UsernameNotFoundException("User not found");
		return appUser;
	}

	@Transactional
	public AppUser loadUserById(Long id) {
		AppUser user = appUserRepository.getById(id);
		if (user == null)
			throw new UsernameNotFoundException("User not found");
		return user;
	}

}
