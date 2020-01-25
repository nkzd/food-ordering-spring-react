package org.mamba.donesi.validator;

import org.mamba.donesi.domain.FoodArticle;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class FoodArticleValidator implements Validator {
	@Override
	public boolean supports(Class<?> aClass) {
		return FoodArticle.class.equals(aClass);
	}

	@Override
	public void validate(Object target, Errors errors) {
		FoodArticle foodArticle = (FoodArticle) target;

		if (foodArticle.getCategoryIdentifier() == null) {
			errors.rejectValue("categoryIdentifier", "Required", "Category identifier is required.");
		}
	}
}
