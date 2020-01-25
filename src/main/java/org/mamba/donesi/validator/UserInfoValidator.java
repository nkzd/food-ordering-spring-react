package org.mamba.donesi.validator;

import org.mamba.donesi.domain.UserInfo;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserInfoValidator implements Validator {

	@Override
	public boolean supports(Class<?> aClass) {
		return UserInfo.class.equals(aClass);
	}

	@Override
	public void validate(Object target, Errors errors) {
		UserInfo userInfo = (UserInfo) target;

		if (userInfo.getFirstName() == null) {
			errors.rejectValue("userInfo", "Required", "First name is required.");
		}
		if (userInfo.getLastName() == null) {
			errors.rejectValue("userInfo", "Required", "Last name is required.");
		}
		if (userInfo.getAddress() == null) {
			errors.rejectValue("userInfo", "Required", "Address name is required.");
		}
	}
}
