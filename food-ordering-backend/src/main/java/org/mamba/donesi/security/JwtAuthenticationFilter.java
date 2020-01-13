package org.mamba.donesi.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.mamba.donesi.security.JwtTokenProvider;
import org.mamba.donesi.services.AdminUserDetailsService;
import org.mamba.donesi.config.ApiConfig;
import org.mamba.donesi.domain.AdminUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private ApiConfig apiConfig;

	@Autowired
	JwtTokenProvider tokenProvider;

	@Autowired
	AdminUserDetailsService adminUserDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		try {

			String jwt = getJWTFromRequest(request);

			if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
				Long userId = tokenProvider.getUserIdFromJWT(jwt);
				AdminUser userDetails = adminUserDetailsService.loadUserById(userId);

				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());

				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authentication);

			}

		} catch (Exception e) {
			logger.info("Could not set user authentication in security context", e);
		}
		filterChain.doFilter(request, response);
	}

	private String getJWTFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader(apiConfig.getHeaderString());
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(apiConfig.getTokenPrefix())) {
			return bearerToken.substring(7, bearerToken.length());
		}
		return null;
	}

}
