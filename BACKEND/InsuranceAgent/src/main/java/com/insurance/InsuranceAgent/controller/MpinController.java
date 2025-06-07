package com.insurance.InsuranceAgent.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.InsuranceAgent.dto.MpinDto;
import com.insurance.InsuranceAgent.service.MpinService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200" )// allow fronted requests
public class MpinController {
	private final MpinService mpinService;
	
	public MpinController(MpinService mpinService) {
		this.mpinService = mpinService;
	}
	
	//set MPIN - Hash and store in Database
	@PostMapping("/set-mpin")
	public ResponseEntity<Map<String, String>> setMpin(@RequestBody MpinDto request){
		String agencyCode = request.getAgencyCode();
		String mpin = request.getMpin();
		String confirmMpin = request.getConfirmMpin();
		
		if(agencyCode == null || agencyCode.trim().isEmpty()) {
			return ResponseEntity.badRequest().body(Map.of("error","Agency code is required."));
			
		}
		String validationError = validateMpin(mpin,confirmMpin);
		if(validationError != null) {
			return ResponseEntity.badRequest().body(Map.of("error",validationError));
			
		}
		//Hash MPIN before storing it securely
		String hashedMpin = mpinService.hashMpin(mpin);
		mpinService.storeMpin(agencyCode,hashedMpin); //Explicitly storing hashed MPIN in DB
		return ResponseEntity.ok(Map.of("message","MPIN setup successful."));
		
	}
	
	//validate MPIN against stored Hash
	@PostMapping("/validate-mpin")
	public ResponseEntity<Map<String,Boolean>> validateMpin(@RequestBody Map<String, String> request){
		String agencyCode = request.get("agencyCode");
		String enteredMpin = request.get("mpin");
		
		if(agencyCode == null || agencyCode.trim().isEmpty()) {
			return ResponseEntity.badRequest().body(Map.of("valid",false));
		}
		
		if(enteredMpin == null || enteredMpin.trim().isEmpty()) {
			return ResponseEntity.badRequest().body(Map.of("valid",false));
		}
		
		boolean isValid = mpinService.validateMpin(agencyCode,enteredMpin);
		return ResponseEntity.ok(Map.of("valid",isValid));
		
		
	}
	//MPIN Validation Logic
	private String validateMpin(String mpin, String confirmMpin) {
		if(mpin ==null || confirmMpin == null  || mpin.trim().isEmpty() || confirmMpin.trim().isEmpty()) {
			return "MPIN fields can not be empty.";
		}
		if(!mpin.matches("\\d{4}")) {
			return "MPIN must be exactly 4 digits.";
		}
		if(!mpin.equals(confirmMpin)) {
			return "MPINs do not match.";
		}
		return null;
	}

}
