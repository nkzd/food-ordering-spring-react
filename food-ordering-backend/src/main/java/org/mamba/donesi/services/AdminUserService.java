package org.mamba.donesi.services;

import org.mamba.donesi.domain.AdminUser;
import org.mamba.donesi.exceptions.UsernameAlreadyExistsException;
import org.mamba.donesi.exceptions.UsernameAlreadyExistsResponse;
import org.mamba.donesi.repositories.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminUserService {
	@Autowired
	private AdminUserRepository adminUserRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public AdminUser save(AdminUser newAdminUser) {
		try {
			newAdminUser.setPassword(bCryptPasswordEncoder.encode(newAdminUser.getPassword()));
			AdminUser adminUser = adminUserRepository.save(newAdminUser);
			newAdminUser.setConfirmPassword("");
			return adminUser;
		}catch(Exception e) {
			throw new UsernameAlreadyExistsException("Username " + newAdminUser.getUsername() + " already exists");
		}
	}
}
