package com.luiggibeats.seguranca.filtro;

import java.io.IOException;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.luiggibeats.seguranca.componentes.CustomUser;
import com.luiggibeats.seguranca.componentes.TokenAuthenticationService;
import com.luiggibeats.seguranca.modelo.Autenticacao;
import com.luiggibeats.seguranca.modelo.TokenResult;

public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {
	
	private static final Logger logger = LoggerFactory.getLogger(JWTLoginFilter.class);

	public JWTLoginFilter(String url, AuthenticationManager authManager) {
		super(new AntPathRequestMatcher(url));
		setAuthenticationManager(authManager);
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException, IOException, ServletException {

		String login = request.getParameter("login");
		String senha = request.getParameter("senha");
		
		Autenticacao credentials = new Autenticacao();
		credentials.setLogin(login);
		credentials.setSenha(senha);				

		return getAuthenticationManager().authenticate(new UsernamePasswordAuthenticationToken(
				credentials.getLogin(), credentials.getSenha(), Collections.emptyList()));
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			FilterChain filterChain, Authentication auth) throws IOException, ServletException {
		
		CustomUser c = (CustomUser) auth.getPrincipal();

		Autenticacao autenticacao = TokenAuthenticationService.getToken(response, auth.getName(), auth.getAuthorities(), c.getGuidUsuario());
		TokenResult token = new TokenResult();
		token.setAccess_token(autenticacao.getToken());	
		token.setAccess_login(autenticacao.getLogin());
		
		ObjectMapper parser = new ObjectMapper();
		String json = parser.writeValueAsString(token);
		
		logger.info("Usuário " + autenticacao.getLogin() + " autorizado.");

		response.addHeader("Content-Type", "application/json");
		response.getWriter().println(json);
	}

}

