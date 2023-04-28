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

import com.sdl.main.model.District;
import com.sdl.main.service.DistrictService;

@CrossOrigin (origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/states/districts")
public class DistrictController {

    @Autowired
    private DistrictService districtService;

    @GetMapping("/displayAll")
    public ResponseEntity<List<District>> getAllDistricts() {
        List<District> districts = districtService.getAllDistricts();
        
        return ResponseEntity.ok(districts);
    }

    @GetMapping("/display/{id}")
    public ResponseEntity<District> getDistrictById(@PathVariable Integer id) {
        District district = districtService.getDistrictById(id);
        
        return ResponseEntity.ok(district);
    }
    
    @GetMapping("/state/{stateId}")
    public ResponseEntity<List<District>> getDistrictsByStateId(@PathVariable Integer stateId) {
        List<District> districts = districtService.getDistrictsByStateId(stateId);
        
        return ResponseEntity.ok(districts);
    }

    @PostMapping("/create")
    public ResponseEntity<District> createDistrict(@RequestBody District district) {
    	District createdDistrict = districtService.createDistrict(district);
		
		return ResponseEntity.ok(createdDistrict);
    }

    @PutMapping("/update")
    public ResponseEntity<District> updateDistrict(@RequestBody District districtDetails) {
    	Integer id = districtDetails.getDistrict_id();
    	District updatedDistrict = districtService.updateDistrict(id, districtDetails);
		
		return ResponseEntity.ok(updatedDistrict);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map <String, Boolean>> deleteDistrict(@PathVariable Integer id) {
        districtService.deleteDistrict(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		
		return ResponseEntity.ok(response);
    }
}
