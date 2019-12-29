package org.mamba.donesi.validator;

import org.mamba.donesi.domain.AdminUser;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator{

	@Override
	public boolean supports(Class<?> aClass) {
		return AdminUser.class.equals(aClass);
	}

	@Override
	public void validate(Object target, Errors errors) {
		AdminUser user = (AdminUser) target;
		
		if(user.getPassword().length() <6){
            errors.rejectValue("password","Length", "Password must be at least 6 characters");
        }
		
		if(!user.getPassword().equals(user.getConfirmPassword())) {
			errors.rejectValue("confirmPassword", "Match", "Passwords must match");
		}
	}

}
