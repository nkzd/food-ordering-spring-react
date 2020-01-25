package org.mamba.donesi.validator;

import org.mamba.donesi.domain.AppUser;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class AppUserValidator implements Validator {

	@Override
	public boolean supports(Class<?> aClass) {
		return AppUser.class.equals(aClass);
	}

	@Override
	public void validate(Object target, Errors errors) {
		AppUser user = (AppUser) target;

		if (user.getPassword().length() < 8) {
			errors.rejectValue("password", "Length", "Password must be at least 8 characters");
		}

		if (!user.getPassword().equals(user.getConfirmPassword())) {
			errors.rejectValue("confirmPassword", "Match", "Passwords must match");
		}
	}

}
