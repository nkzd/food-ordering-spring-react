package org.mamba.donesi.services;

import org.mamba.donesi.domain.AdminUser;
import org.mamba.donesi.repositories.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
public class AdminUserDetailsService implements UserDetailsService{

	@Autowired 
	private AdminUserRepository adminUserRepository;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		AdminUser adminUser = adminUserRepository.findByUsername(username);
		if(adminUser==null)
			throw new UsernameNotFoundException("User not found");
		return adminUser;
	}
	
	@Transactional
	public AdminUser loadUserById(Long id) {
		AdminUser user = adminUserRepository.getById(id);
		if (user == null)
			throw new UsernameNotFoundException("User not found");
		return user;
	}
	
}
