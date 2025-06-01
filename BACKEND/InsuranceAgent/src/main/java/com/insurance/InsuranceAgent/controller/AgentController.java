package com.insurance. InsuranceAgent.controller; 
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RequestParam; 
import org.springframework.web.bind.annotation.RestController;
import com.insurance.InsuranceAgent.dto.AgentDto; 
import com.insurance.InsuranceAgent.entity.Agent; 
import com.insurance.InsuranceAgent.service.AgentService;

@RestController
@RequestMapping("/agents")
public class AgentController {
@Autowired
AgentService agentService;
@GetMapping("/{id}")
public Agent getAgent (@PathVariable Integer id, @RequestParam String agencyCode) { 
	return agentService.getAgentByAgencyCode (id, agencyCode);
}

@GetMapping("/validateAgencyCode")
public ResponseEntity<String> validateAgencyCode(@RequestParam String agencyCode){
	boolean isValid = agentService.validateAgencyCode(agencyCode);
	if(isValid) {
		return new ResponseEntity<>("Valid Agency Code.", HttpStatus.OK);
	}
	else {
		return new ResponseEntity<>("Incorrect agency code, please enter a valid code", HttpStatus.BAD_REQUEST);
	}
}

@GetMapping("/getRoles")
public ResponseEntity<List<Agent>> getAllAgents(){
	List<Agent> allAgent = agentService.getAllAgent();
	return new ResponseEntity<>(allAgent, HttpStatus.OK);
}

@PostMapping("/adAgent")
public ResponseEntity<String> loginAgent(@RequestBody AgentDto agentdto){
	String response= agentService.loginAgent(agentDto);
	return new ResponseEntity<>(response, HttpStatus.CREATED);
}
}

