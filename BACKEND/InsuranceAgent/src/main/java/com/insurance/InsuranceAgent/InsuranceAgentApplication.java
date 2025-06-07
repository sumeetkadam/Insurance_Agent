package com.insurance.InsuranceAgent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class InsuranceAgentApplication {
	public static void main(String[] args) {

		SpringApplication.run(InsuranceAgentApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**") // Allow all routes
						.allowedOrigins("http://localhost:4200") // Allow your frontend URL
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow all me .allowedHeaders("*")
																					// // Allow all headers
						.allowCredentials(true); // Allow credentials (if needed)
			}
		};
	}
}
