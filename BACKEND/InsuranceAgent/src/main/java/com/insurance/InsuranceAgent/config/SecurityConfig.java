package com.insurance.InsuranceAgent.config;

import org.springframework.context.annotation.Bean; //package com.infy. InsuranceAgent.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

//---------------
//@Configuration 
//@EnableWebSecurity
//public class SecurityConfig {
//public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception {
//http.headers()
//.frameOptions()
//.sameOrigin(); // Allows embedding from the same origin
//return http.build();
//}
//}
//-------------------

@Configuration
public class SecurityConfig {
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http

				.authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
				.csrf().disable() // Disable CSRF (only if necessary)
				.headers().frameOptions().disable(); // Disable frame options (if needed)
//		.anyRequest().permitAll();
		return http.build();
	}
}
