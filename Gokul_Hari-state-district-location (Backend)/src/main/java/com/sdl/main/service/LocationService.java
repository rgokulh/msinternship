package com.sdl.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sdl.main.exception.LocationNotFoundException;
import com.sdl.main.model.Location;
import com.sdl.main.repository.LocationRepository;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public Location getLocationById(Integer id) {
        return locationRepository.findById(id).orElseThrow(() -> new LocationNotFoundException("Location not found for ID: " + id));
    }
    
    public List<Location> getLocationsByDistrictId(Integer district_id) {
        return locationRepository.findByDistrictDistrictId(district_id);
    }

    public Location createLocation(Location location) {
        return locationRepository.save(location);
    }

    public Location updateLocation(Integer id, Location locationDetails) {
        Location location = getLocationById(id);
    	location.setLocationCode(locationDetails.getLocationCode());
        location.setLocationName(locationDetails.getLocationName());
        location.setDistrict(locationDetails.getDistrict());
        return locationRepository.save(location);
    }

    public void deleteLocation(Integer id) {
    	Location location = getLocationById(id);
        locationRepository.delete(location);
    }
}
