package org.mamba.donesi.exceptions;

public class IdNotInAccountResponse {
	private String idNotFound;

	public IdNotInAccountResponse(String idNotFound) {
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
