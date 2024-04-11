package com.luiggibeats.seguranca.componentes;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserDetailServiceImpl implements UserDetailsService {

	private static final Logger logger = LoggerFactory.getLogger(UserDetailServiceImpl.class);

	private JdbcTemplate jdbcTemplate;

	@Autowired
	public UserDetailServiceImpl(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException, DataAccessException {

		try {

			UserDetails u = getCustomUser(userName);

			logger.info("Username: " + userName + " encontrado.");
			
			return u;
		} catch (Exception ex) {			
			logger.error("Username: " + userName + " não econtrado na base. Acesso negado. ");
			throw new UsernameNotFoundException(userName);
		}

	}	

	@SuppressWarnings("deprecation")
	private CustomUser getCustomUser(String userName) {

		logger.info("getCustomUser: " + userName + ".");

		CustomUser customUser = jdbcTemplate.queryForObject(
				"select login, senha, guid_usuario from usuario where login=?", new Object[] { userName },
				new UserRowMapper());
		logger.info("RETORNO: " + customUser + ".");
		System.out.println(customUser);

		if (customUser != null) {

			customUser = new CustomUser(customUser.getUsername(), customUser.getPassword(), customUser.isEnabled(),
					customUser.isAccountNonExpired(), customUser.isCredentialsNonExpired(),
					customUser.isAccountNonLocked(), getUserRoles(customUser), customUser.getGuidUsuario());
		}

		return customUser;

	}

	private class UserRowMapper implements RowMapper<CustomUser> {
		@Override
		public CustomUser mapRow(ResultSet rs, int rowNum) throws SQLException {
			return new CustomUser(rs.getString("login"), rs.getString("senha"), true, true, true, true,
					Collections.emptyList(), rs.getInt("guid_usuario"));

		}
	}

	private List<GrantedAuthority> getUserRoles(CustomUser user) {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority("ADMIN"));
		return authorities;		
	}
	
}

