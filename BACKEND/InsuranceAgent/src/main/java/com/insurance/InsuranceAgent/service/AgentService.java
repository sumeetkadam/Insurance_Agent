package com.insurance.InsuranceAgent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insurance.InsuranceAgent.dto.AgentDto;
import com.insurance.InsuranceAgent.entity.Agent;
import com.insurance.InsuranceAgent.repository.AgentRepository;

@Service
public class AgentService {
	@Autowired
	private AgentRepository agentRepository;
	
	public Agent getAgentByAgencyCode(Integer id, String agencyCode) {
		return agentRepository.findByAgencyCode(agencyCode);
	}
	public List<Agent>getAllAgent(){
		return agentRepository.findAll();
	}
	public boolean validateAgencyCode(String agencyCode) {
		return agentRepository.existsByAgencyCode(agencyCode);
	}
	public String loginAgent(AgentDto agentDto) {
		Agent agent = new Agent();
		agent.setAgencyCode(agentDto.getAgencyCode());
		agent.setRole(agentDto.getRole());
		agentRepository.save(agent);
		return "Agent added sucessfully";
	}

}
