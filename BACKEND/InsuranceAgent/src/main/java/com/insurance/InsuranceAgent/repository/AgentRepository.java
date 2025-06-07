package com.insurance.InsuranceAgent.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.insurance.InsuranceAgent.entity.Agent;

public interface AgentRepository extends JpaRepository<Agent,String>{
	Agent findByAgencyCode(String agencyCode);
	boolean existsByAgencyCode(String agencyCode);

}
