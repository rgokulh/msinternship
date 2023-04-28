package com.sdl.main.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "district", uniqueConstraints = {@UniqueConstraint(columnNames = {"district_code", "district_name"})})
public class District {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int district_id;

	@Column(name = "district_code")
	private String district_Code;

	@Column(name = "district_name")
	private String district_Name;

	@ManyToOne
	@JoinColumn(name = "state_id")
	private State state;

	@Column(name = "state_name")
	private String state_Name;
	
	public District() {
		
	}

	public int getDistrict_id() {
		return district_id;
	}

	public void setDistrict_id(int district_id) {
		this.district_id = district_id;
	}

	public String getDistrictCode() {
		return district_Code;
	}

	public void setDistrictCode(String district_Code) {
		this.district_Code = district_Code;
	}

	public String getDistrictName() {
		return district_Name;
	}

	public void setDistrictName(String district_Name) {
		this.district_Name = district_Name;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}

	public String getStateName() {
		return state_Name;
	}

	public void setStateName(String state_Name) {
		this.state_Name = state_Name;
	}
}
