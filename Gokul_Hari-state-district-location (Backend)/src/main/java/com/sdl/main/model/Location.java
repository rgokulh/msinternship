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
@Table(name = "location", uniqueConstraints = {@UniqueConstraint(columnNames = {"location_code", "location_name"})})
public class Location {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int location_id;

	@Column(name = "location_code")
	private String location_Code;

	@Column(name = "location_name")
	private String location_Name;

	@ManyToOne
	@JoinColumn(name = "district_id")
	private District district;

	@Column(name = "district_name")
	private String district_Name;
	
	public Location() {
		
	}

	public int getLocation_id() {
		return location_id;
	}

	public void setLocation_id(int location_id) {
		this.location_id = location_id;
	}

	public String getLocationCode() {
		return location_Code;
	}

	public void setLocationCode(String location_Code) {
		this.location_Code = location_Code;
	}

	public String getLocationName() {
		return location_Name;
	}

	public void setLocationName(String location_Name) {
		this.location_Name = location_Name;
	}

	public District getDistrict() {
		return district;
	}

	public void setDistrict(District district) {
		this.district = district;
	}

	public String getDistrictName() {
		return district_Name;
	}

	public void setDistrictName(String district_Name) {
		this.district_Name = district_Name;
	}
}
