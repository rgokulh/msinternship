package com.sdl.main.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdl.main.model.State;
import com.sdl.main.service.StateService;

@CrossOrigin (origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/states")
public class StateController {

	@Autowired
	private StateService stateService;

	@GetMapping("/displayAll")
	public ResponseEntity<List<State>> getAllStates(){
		List<State> states = stateService.getAllStates();
		
		return ResponseEntity.ok(states);
	}
 
	@GetMapping("/display/{id}")
	public ResponseEntity<State> getStateById(@PathVariable Integer id) {
		State state = stateService.getStateById(id);
		
		return ResponseEntity.ok(state);
	}
 
	@PostMapping("/create")
	public ResponseEntity<State> createState(@RequestBody State state) {
		State createdState = stateService.createState(state);
		
		return ResponseEntity.ok(createdState);
	}
 
	@PutMapping("/update")
	public ResponseEntity<State> updateState(@RequestBody State stateDetails){
		Integer id = stateDetails.getState_id();
	    State updatedState = stateService.updateState(id, stateDetails);
	    
	    return ResponseEntity.ok(updatedState);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity <Map <String, Boolean> > deleteState(@PathVariable Integer id){
		stateService.deleteState(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		
		return ResponseEntity.ok(response);
	}
}
