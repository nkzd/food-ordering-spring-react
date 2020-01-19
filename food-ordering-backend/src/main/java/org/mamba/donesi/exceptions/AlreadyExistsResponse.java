package org.mamba.donesi.exceptions;

public class AlreadyExistsResponse {
	private String username;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public AlreadyExistsResponse(String username) {
		super();
		this.username = username;
	}
	
}
