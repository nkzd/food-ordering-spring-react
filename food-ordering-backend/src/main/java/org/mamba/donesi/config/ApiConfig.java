package org.mamba.donesi.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "api")
public class ApiConfig {
	private String publicUrls;
	private String tokenPrefix;
	private String headerString;
	private Long expirationTime;

	public ApiConfig() {
		super();
	}

	public String getPublicUrls() {
		return publicUrls;
	}

	public void setPublicUrls(String publicUrls) {
		this.publicUrls = publicUrls;
	}

	public String getTokenPrefix() {
		return tokenPrefix;
	}

	public void setTokenPrefix(String tokenPrefix) {
		this.tokenPrefix = tokenPrefix;
	}

	public String getHeaderString() {
		return headerString;
	}

	public void setHeaderString(String headerString) {
		this.headerString = headerString;
	}

	public Long getExpirationTime() {
		return expirationTime;
	}

	public void setExpirationTime(Long expirationTime) {
		this.expirationTime = expirationTime;
	}

}
