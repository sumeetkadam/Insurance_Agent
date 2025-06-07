package com.insurance.InsuranceAgent.entity;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class AgentCredDetails {
	@Id
	@Column(name = "agency_code",unique = true, nullable = false)
	private String agencyCode;
	private String role;
	private String hashedMpin;
	private String hashedPassword;
	
	@Column(name = "created_at", updatable =false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;
	
	@Column(name = "updated_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Date updatedAt;

	public String getAgencyCode() {
		return agencyCode;
	}

	public void setAgencyCode(String agencyCode) {
		this.agencyCode = agencyCode;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getHashedMpin() {
		return hashedMpin;
	}

	public void setHashedMpin(String hashedMpin) {
		this.hashedMpin = hashedMpin;
	}

	public String getHashedPassword() {
		return hashedPassword;
	}

	public void setHashedPassword(String hashedPassword) {
		this.hashedPassword = hashedPassword;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
	
	
	
	

}
