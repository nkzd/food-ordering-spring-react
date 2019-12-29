package org.mamba.donesi.security;

public class SecurityConstants {
	public static final String SIGN_UP_URLS = "/api/admin/users/**";
    public static final String H2_URL = "h2-console/**";
    public static final String SECRET ="SecretKeyToGenJWTs";
    public static final String SECRETB64 ="U2VjcmV0S2V5VG9HZW5KV1Rz";
    public static final String SECRET_256 = "BMK4GZ8bzDGh8VGXmuUKOkPwvQL6YiZy";
    public static final String BSECRET_256 = "Qk1LNEdaOGJ6REdoOFZHWG11VUtPa1B3dlFMNllpWnk=";
    public static final String TOKEN_PREFIX= "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 30_000_000; 
    public static final String ROLE_PREFIX = "ROLE_";
}
