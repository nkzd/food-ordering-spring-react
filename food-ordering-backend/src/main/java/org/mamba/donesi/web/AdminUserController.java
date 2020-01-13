package org.mamba.donesi.web;

import javax.validation.Valid;
import org.mamba.donesi.config.ApiConfig;
import org.mamba.donesi.domain.AdminUser;
import org.mamba.donesi.payload.JwtLoginSuccessResponse;
import org.mamba.donesi.payload.LoginRequest;
import org.mamba.donesi.security.JwtTokenProvider;
import org.mamba.donesi.services.AdminUserService;
import org.mamba.donesi.services.MapValidationErrorService;
import org.mamba.donesi.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/users/")
@CrossOrigin
public class AdminUserController {

	@Autowired
	private ApiConfig apiConfig;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private UserValidator adminUserValidator;

	@Autowired
	private AdminUserService adminUserService;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody AdminUser user, BindingResult result) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;

		// provjera passworda
		adminUserValidator.validate(user, result);

		errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		AdminUser newUser = adminUserService.save(user);
		return new ResponseEntity<AdminUser>(newUser, HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = apiConfig.getTokenPrefix() + jwtTokenProvider.generateToken(authentication);

		return new ResponseEntity<JwtLoginSuccessResponse>(new JwtLoginSuccessResponse(jwt), HttpStatus.OK);
	}

}
