package com.luiggibeats.seguranca.modelo;

public class TokenResult {

	private String access_token;
	private String expires_in = "-1";
	private String token_type = "Bearer";

	private String access_login;

	public String getAccess_token() {
		return access_token;
	}

	public void setAccess_token(String access_token) {
		this.access_token = access_token;
	}

	public String getExpires_in() {
		return expires_in;
	}

	public void setExpires_in(String expires_in) {
		this.expires_in = expires_in;
	}

	public String getToken_type() {
		return token_type;
	}

	public void setToken_type(String token_type) {
		this.token_type = token_type;
	}

	public String getAccess_login() {
		return access_login;
	}

	public void setAccess_login(String access_login) {
		this.access_login = access_login;
	}

}
