package org.mamba.donesi.domain;

import javax.validation.constraints.NotBlank;

public class PasswordChangeRequest {
	@NotBlank(message = "Password is required")
	private String password;
	
	@NotBlank(message = "Confirm password is required")
	private String confirmPassword;

	public PasswordChangeRequest() {
		super();
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	
}
