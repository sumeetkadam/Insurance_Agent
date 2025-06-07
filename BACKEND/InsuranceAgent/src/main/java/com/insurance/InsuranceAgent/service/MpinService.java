package com.insurance.InsuranceAgent.service;

import java.util.Date;
import java.util.regex.Pattern;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.insurance.InsuranceAgent.entity.AgentCredDetails;
import com.insurance.InsuranceAgent.repository.AgentCredDetailsRepository;

import jakarta.transaction.Transactional;

@Service
public class MpinService {
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	private final AgentCredDetailsRepository agentCredDetailsRepository;

	public MpinService(AgentCredDetailsRepository agentCredDetailsRepository) {
		this.agentCredDetailsRepository = agentCredDetailsRepository;
	}

	// Validate MPIN format (must be exactly 4 digits, numeric only)
	public boolean isValidMpin(String mpin) {
		return Pattern.compile("^\\d{4}$").matcher(mpin).matches();
	}

	// Generate hashed MPIN using BCrypt
	public String hashMpin(String mpin) {
		return passwordEncoder.encode(mpin);
	}

	// Store hashed MPIN in the database
	@Transactional
	public void storeMpin(String agencyCode, String hashedMpin) {
		AgentCredDetails agent = agentCredDetailsRepository.findByAgencyCode(agencyCode).orElseGet(() -> {
			AgentCredDetails newAgent = new AgentCredDetails();
			newAgent.setAgencyCode(agencyCode);
			newAgent.setRole("Agent"); // default role
			newAgent.setCreatedAt(new Date());
			return agentCredDetailsRepository.save(newAgent);
		});

		agent.setHashedMpin(hashedMpin); // correctly assigned hashed MPIN
		agent.setUpdatedAt(new Date());
		agentCredDetailsRepository.save(agent); // Explicitly saving entity

		System.out.println("MPIN updated successfully for agencyCode" + agencyCode);
	}

	// validate entered MPIN against stored MPIN hash
	public boolean validateMpin(String agencyCode, String enteredMpin) {
		AgentCredDetails agent = agentCredDetailsRepository.findByAgencyCode(agencyCode)
				.orElseThrow(() -> new RuntimeException("User not found"));
		// compare entered MPIN with stored MPIN
		return passwordEncoder.matches(enteredMpin, agent.getHashedMpin());
	}

}
