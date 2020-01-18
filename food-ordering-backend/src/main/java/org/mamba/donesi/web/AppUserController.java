package org.mamba.donesi.web;

import java.security.Principal;

import javax.validation.Valid;

import org.mamba.donesi.config.ApiConfig;
import org.mamba.donesi.domain.AppUser;
import org.mamba.donesi.domain.UserInfo;
import org.mamba.donesi.payload.JwtLoginSuccessResponse;
import org.mamba.donesi.payload.LoginRequest;
import org.mamba.donesi.security.JwtTokenProvider;
import org.mamba.donesi.services.AppUserService;
import org.mamba.donesi.services.MapValidationErrorService;
import org.mamba.donesi.services.UserInfoService;
import org.mamba.donesi.validator.AppUserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users/")
@CrossOrigin
public class AppUserController {

	@Autowired
	private ApiConfig apiConfig;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private AppUserValidator appUserValidator;

	@Autowired
	private AppUserService appUserService;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@Autowired
	private UserInfoService userInfoService;

	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody AppUser user, BindingResult result) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;

		// provjera passworda
		appUserValidator.validate(user, result);
		
		errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		AppUser newUser = appUserService.save(user);
		return new ResponseEntity<AppUser>(newUser, HttpStatus.CREATED);
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
	

	@PostMapping("/userinfo")
	public ResponseEntity<?> setUserInfo(@Valid @RequestBody UserInfo userInfo, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		

		String username = principal.getName();
		
		AppUser appUser = appUserService.getByUsername(username);
		UserInfo newUserInfo = userInfoService.saveOrUpdateUserInfo(appUser, userInfo);
		
		return new ResponseEntity<UserInfo>(newUserInfo, HttpStatus.CREATED);
	}
	
	@GetMapping("/userinfo")
	public ResponseEntity<?> getUserInfo(Principal principal) {
		String username = principal.getName();
		
		AppUser appUser = appUserService.getByUsername(username);
		
		UserInfo userInfo = userInfoService.getUserInfo(appUser);
		
		return new ResponseEntity<UserInfo>(userInfo, HttpStatus.CREATED);
	}

}
