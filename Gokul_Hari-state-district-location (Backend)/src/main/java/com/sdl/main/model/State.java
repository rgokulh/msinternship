package com.sdl.main.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "state", uniqueConstraints = {@UniqueConstraint(columnNames = {"state_code", "state_name"})})
public class State {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int state_id;
	
	@Column(name = "state_code")
	private String state_Code;

	@Column(name = "state_name")
	private String state_Name;

	public State() {
	}

	public int getState_id() {
		return state_id;
	}

	public void setState_id(int state_id) {
		this.state_id = state_id;
	}

	public String getStateCode() {
		return state_Code;
	}
	
	public void setStateCode(String state_Code) {
		this.state_Code = state_Code;
	}
	
	public String getStateName() {
		return state_Name;
	}
	
	public void setStateName(String state_Name) {
		this.state_Name = state_Name;
	}
}
