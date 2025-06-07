package com.insurance.InsuranceAgent.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.InsuranceAgent.dto.PasswordDto;
import com.insurance.InsuranceAgent.service.PasswordService;

@RestController
@RequestMapping("/auth")
public class PasswordController {
	private final PasswordService passwordService;
	
	public PasswordController(PasswordService passwordService) {
		this.passwordService = passwordService;
	}
	
	@PostMapping("/set-password")
	public ResponseEntity<Map<String, String>> setPassword(@RequestBody PasswordDto request){
		String agencyCode = request.getAgencyCode();
		String password = request.getPassword();
		String confirmPassword = request.getConfirmPassword();
		
		if(agencyCode == null || agencyCode.trim().isEmpty()) {
			return ResponseEntity.badRequest().body(Map.of("error","Agency code is required."));
		}
		
		if(password == null || confirmPassword == null || password.trim().isEmpty() || confirmPassword.trim().isEmpty()) {
			return ResponseEntity.badRequest().body(Map.of("error","Password fields can not be empty."));
		}
		if(!passwordService.isValidPassword(password)) {
			return ResponseEntity.badRequest().body(Map.of("error","Password does not meet the recommended criteria"));
			
		}
		if(!password.equals(confirmPassword)) {
			return ResponseEntity.badRequest().body(Map.of("error","Passwords do not match."));
		}
		String hashedPassword = passwordService.hashPassword(password);
		
		try{
			passwordService.storePassword(agencyCode, hashedPassword);
			return ResponseEntity.ok(Map.of("message","Password updated successfully. You can now log in"));
		}catch(Exception e) {
			return ResponseEntity.internalServerError().body(Map.of("error","Failed to update password"));
		}
	}
	
	@PostMapping("/validate-password") //Must match angular request URL
	public ResponseEntity<Map<String,Boolean>> validatePassword(@RequestBody PasswordDto request){
		String agencyCode = request.getAgencyCode();
		String enteredPassword = request.getPassword();
		
		if(agencyCode == null || agencyCode.trim().isEmpty()) {
			return ResponseEntity.badRequest().body(Map.of("valid", false));
		}
		if(enteredPassword == null || enteredPassword.trim().isEmpty()) {
			return ResponseEntity.badRequest().body(Map.of("valid", false));
		}
		boolean isValid = passwordService.validatePassword(agencyCode, enteredPassword);
		
		return ResponseEntity.ok(Map.of("valid", isValid));
	}
}
