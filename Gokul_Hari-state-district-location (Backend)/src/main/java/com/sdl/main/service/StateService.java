package com.sdl.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sdl.main.exception.StateNotFoundException;
import com.sdl.main.model.State;
import com.sdl.main.repository.StateRepository;

@Service
public class StateService {

	@Autowired
	private StateRepository stateRepository;

	public List<State> getAllStates(){
		return stateRepository.findAll();
	}
 
	public State getStateById(Integer id) {
		return stateRepository.findById(id).orElseThrow(() -> new StateNotFoundException("State not found for ID: " + id));
	}
 
	public State createState(State state) {
		return stateRepository.save(state);
	}
 
	public State updateState(Integer id, State stateDetails) {
		State state = getStateById(id);
	    state.setStateCode(stateDetails.getStateCode());
	    state.setStateName(stateDetails.getStateName());
		return stateRepository.save(state);
	}

	public void deleteState(Integer id) {
		State state = getStateById(id);
		stateRepository.delete(state);
	}
}
