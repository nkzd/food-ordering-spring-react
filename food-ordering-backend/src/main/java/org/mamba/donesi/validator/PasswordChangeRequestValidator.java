package org.mamba.donesi.validator;

import org.mamba.donesi.domain.PasswordChangeRequest;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class PasswordChangeRequestValidator implements Validator {

	@Override
	public boolean supports(Class<?> aClass) {
		return PasswordChangeRequest.class.equals(aClass);
	}

	@Override
	public void validate(Object target, Errors errors) {
		PasswordChangeRequest request = (PasswordChangeRequest) target;

		if (request.getPassword().length() < 8) {
			errors.rejectValue("password", "Length", "Password must be at least 8 characters");
		}

		if (!request.getPassword().equals(request.getConfirmPassword())) {
			errors.rejectValue("confirmPassword", "Match", "Passwords must match");
		}
	}

}
