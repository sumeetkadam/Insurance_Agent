package com.insurance.InsuranceAgent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.insurance.InsuranceAgent.entity.AgentCredDetails;

public interface AgentCredDetailsRepository extends JpaRepository<AgentCredDetails, String>{
	Optional<AgentCredDetails> findByAgencyCode(String agencyCode);
	
}
