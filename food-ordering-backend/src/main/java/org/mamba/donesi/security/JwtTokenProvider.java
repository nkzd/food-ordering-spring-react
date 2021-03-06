package org.mamba.donesi.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.mamba.donesi.config.ApiConfig;
import org.mamba.donesi.domain.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtTokenProvider {

	@Autowired
	private ApiConfig apiConfig;

	public String generateToken(Authentication authentication) {
		AppUser appUser = (AppUser) authentication.getPrincipal();

		Date now = new Date(System.currentTimeMillis());
		Date expiryDate = new Date(now.getTime() + apiConfig.getExpirationTime());

		String userId = Long.toString(appUser.getId());

		Map<String, Object> claims = new HashMap<>();
		claims.put("id", (Long.toString(appUser.getId())));
		claims.put("username", appUser.getUsername());

		return Jwts.builder().setSubject(userId).setClaims(claims).setIssuedAt(now).setExpiration(expiryDate)
				.signWith(SignatureAlgorithm.HS512, apiConfig.getJwtSecret()).compact();
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(apiConfig.getJwtSecret()).parseClaimsJws(token);
			return true;
		} catch (SignatureException ex) {
			System.out.println("Invalid JWT Signature");
		} catch (MalformedJwtException ex) {
			System.out.println("Invalid JWT Token");
		} catch (ExpiredJwtException ex) {
			System.out.println("Expired JWT Token");
		} catch (UnsupportedJwtException ex) {
			System.out.println("Unsupported JWT Token");
		} catch (IllegalArgumentException ex) {
			System.out.println("JWT claims string is empty");
		}
		return false;
	}

	public Long getUserIdFromJWT(String token) {
		Claims claims = Jwts.parser().setSigningKey(apiConfig.getJwtSecret()).parseClaimsJws(token).getBody();
		String id = (String) claims.get("id");

		return Long.parseLong(id);
	}
}
