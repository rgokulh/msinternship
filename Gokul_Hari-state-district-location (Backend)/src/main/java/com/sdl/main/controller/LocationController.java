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

import com.sdl.main.model.Location;
import com.sdl.main.service.LocationService;

@CrossOrigin (origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/states/districts/locations")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping("/displayAll")
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> locations = locationService.getAllLocations();
        
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/display/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable Integer id) {
        Location location = locationService.getLocationById(id);
        
        return ResponseEntity.ok(location);
    }
    
    @GetMapping("/district/{districtId}")
    public ResponseEntity<List<Location>> getLocationsByDistrictId(@PathVariable Integer districtId) {
        List<Location> locations = locationService.getLocationsByDistrictId(districtId);
        
        return ResponseEntity.ok(locations);
    }

    @PostMapping("/create")
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
    	Location createdLocation = locationService.createLocation(location);
		
		return ResponseEntity.ok(createdLocation);
    }

    @PutMapping("/update")
    public ResponseEntity<Location> updateLocation(@RequestBody Location locationDetails) {
    	Integer id = locationDetails.getLocation_id();
    	Location updatedLocation = locationService.updateLocation(id, locationDetails);
		
		return ResponseEntity.ok(updatedLocation);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map <String, Boolean>> deleteLocation(@PathVariable Integer id) {
        locationService.deleteLocation(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		
		return ResponseEntity.ok(response);
    }
}
