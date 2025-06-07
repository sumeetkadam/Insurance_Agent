package com.insurance.InsuranceAgent.controller;

import com.insurance.InsuranceAgent.dto.OtpDto;
import com.insurance.InsuranceAgent.service.OtpService;


import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/otp")
public class OtpController {
	
	private final OtpService otpService;
	
	public OtpController(OtpService otpService) {
		this.otpService = otpService;
		
	}
	@PostMapping("/generate")
	public ResponseEntity<String> generateOtp(@RequestBody OtpDto request){
		String agencyCode = request.getAgencyCode();
		System.out.println("Received OTP request for agencyCode:" + agencyCode); //Backend logging
		
		if(agencyCode == null || agencyCode.trim().isEmpty()) {
			return ResponseEntity.badRequest().body("Agency code is required");
		}
		
		Optional<String> otp = otpService.generateOtp(agencyCode);
		otp.ifPresent(o->System.out.println("Generate OTP:"+ o));  //LOggenerated OTP
		return otp.map(ResponseEntity::ok).orElseGet(()-> ResponseEntity.badRequest().body("Invalid agency code."));
	}
	
	@PostMapping("/validate")
	public ResponseEntity<Map<String, String>> validateOtp(@RequestBody OtpDto request){
		String agencyCode = request.getAgencyCode();
		String enteredOtp = request.getEnteredOtp();
		
		if(agencyCode == null || enteredOtp == null || agencyCode.trim().isEmpty() || enteredOtp.trim().isEmpty()) {
			return ResponseEntity.badRequest().body(Map.of("error","Missing agency code or OTP!!"));
	}
	boolean isValid = otpService.validateOtp(agencyCode,enteredOtp);
	
	if(isValid) {
		return ResponseEntity.ok(Map.of("message", "OTP Verified"));
	}
	else {
		return ResponseEntity.badRequest().body(Map.of("error","Incorrect OTP, Please try again."));
	}
}

	@PostMapping("/resend")
	public ResponseEntity<String> resendOtp(@RequestParam String agencyCode){
		if(agencyCode == null || agencyCode.trim().isEmpty()) {
			return ResponseEntity.badRequest().body("Agency code is required.");
		}
		Optional<String> otp = otpService.resendOtp(agencyCode);
		return otp.map(ResponseEntity::ok).orElseGet(
				()-> ResponseEntity.badRequest().body("OTP resend limit reached or agency code is invalid"));
		
	}
	

}
