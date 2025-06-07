package com.insurance.InsuranceAgent.service;

import java.util.Date;
import java.util.regex.Pattern;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.insurance.InsuranceAgent.entity.AgentCredDetails;
import com.insurance.InsuranceAgent.repository.AgentCredDetailsRepository;

import jakarta.transaction.Transactional;

@Service
public class PasswordService {
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	private final AgentCredDetailsRepository agentCredDetailsRepository;
	
	public PasswordService(AgentCredDetailsRepository agentCredDetailsRepository) {
		this.agentCredDetailsRepository = agentCredDetailsRepository;
	}
	
	public boolean isValidPassword (String password) {
		return Pattern.compile("^(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=])(?!.*\\s).{8,}$").matcher(password).matches();
		
	}
	public String hashPassword(String password) {
		return passwordEncoder.encode(password);
	}
	
	@Transactional
	public void storePassword(String agencyCode, String hashedPassword) {
//		AgentCredRepository<AgentCredDetails, String> agentCredDetailsRepository;
		AgentCredDetails agent = agentCredDetailsRepository.findByAgencyCode(agencyCode).orElseGet(()->{
			//if user not found, create a new one
			AgentCredDetails newAgent = new AgentCredDetails();
			newAgent.setAgencyCode(agencyCode);
			newAgent.setRole("Agent"); //default role
			newAgent.setCreatedAt(new Date());
			return agentCredDetailsRepository.save(newAgent);
		});
		
		
		agent.setHashedPassword(hashedPassword);
		agent.setUpdatedAt(new Date());
		agentCredDetailsRepository.save(agent);
		
		System.out.println("Password updated succesfull for agencyCode:" + agencyCode);
	}
	@Transactional
	public void ceateUser (String agencyCode , String role) {
		if(agentCredDetailsRepository.findByAgencyCode(agencyCode).isPresent()) {
			throw new RuntimeException("User alreday exists");
		}
		
		AgentCredDetails newUser = new AgentCredDetails();
		newUser.setAgencyCode(agencyCode);
		newUser.setRole(role);
		newUser.setCreatedAt(new Date());
		
		agentCredDetailsRepository.save(newUser);
		System.out.println("New user created with agencyCode:"+ agencyCode);
	}
	
	//validate password against hashed value in database
	public boolean validatePassword(String agencyCode, String enteredPassword) {
		AgentCredDetails agent = agentCredDetailsRepository.findByAgencyCode(agencyCode)
				.orElseThrow(()-> new RuntimeException("User not found"));
		
		//compare entered password with stored hashed password
		return passwordEncoder.matches(enteredPassword, agent.getHashedPassword());
	}


}
