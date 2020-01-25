package org.mamba.donesi.exceptions;

public class NotInAccountResponse {
	private String idNotFound;

	public NotInAccountResponse(String idNotFound) {
		super();
		this.idNotFound = idNotFound;
	}

	public String getIdNotFound() {
		return idNotFound;
	}

	public void setIdNotFound(String idNotFound) {
		this.idNotFound = idNotFound;
	}

}
