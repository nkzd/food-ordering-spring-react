package org.mamba.donesi.payload;

public class JwtLoginSuccessResponse {
	private String token;

	public JwtLoginSuccessResponse() {
		super();
	}

	public JwtLoginSuccessResponse(String token) {
		super();
		this.token = token;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
