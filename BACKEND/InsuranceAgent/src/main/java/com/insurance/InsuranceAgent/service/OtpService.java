package com.insurance.InsuranceAgent.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class OtpService {
	private final Map<String, String> otpStore = new HashMap<>();
	private final Map<String, Integer> resendCount = new HashMap<>();
	private final List<String> validAgencyCodes = Arrays.asList("123","124","125","126");
	
	public Optional<String> generateOtp (String agencyCode){
		if(!validAgencyCodes.contains(agencyCode)) {
			return Optional.empty();
		}
		String otp = String.valueOf(new Random().nextInt(900000)+100000);
		otpStore.put(agencyCode, otp);
		resendCount.put(agencyCode, 0); //Reset resend count
		return Optional.of(otp);
	}
	
	public boolean validateOtp(String agencyCode, String enteredOtp) {
		return otpStore.containsKey(agencyCode) && otpStore.get(agencyCode).equals(enteredOtp);
		
	}
	public Optional<String> resendOtp(String agencyCode){
		if(!validAgencyCodes.contains(agencyCode) || resendCount.getOrDefault(agencyCode, 0) >= 2 ) {
			return Optional.empty();
		}
		resendCount.put(agencyCode,resendCount.getOrDefault(agencyCode, 0)+1);
		String otp = String.valueOf(new Random().nextInt(900000)+100000);
		otpStore.put(agencyCode, otp);
		return Optional.of(otp);
	}

}
