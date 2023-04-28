package com.sdl.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sdl.main.exception.DistrictNotFoundException;
import com.sdl.main.model.District;
import com.sdl.main.repository.DistrictRepository;

@Service
public class DistrictService {

    @Autowired
    private DistrictRepository districtRepository;

    public List<District> getAllDistricts() {
        return districtRepository.findAll();
    }

    public District getDistrictById(Integer id) {
        return districtRepository.findById(id).orElseThrow(() -> new DistrictNotFoundException("District not found for ID: " + id));
    }
    
    public List<District> getDistrictsByStateId(Integer state_id) {
        return districtRepository.findByStateStateId(state_id);
    }

    public District createDistrict(District district) {
        return districtRepository.save(district);
    }

    public District updateDistrict(Integer id, District districtDetails) {
        District district = getDistrictById(id);
    	district.setDistrictCode(districtDetails.getDistrictCode());
        district.setDistrictName(districtDetails.getDistrictName());
        district.setState(districtDetails.getState());
        return districtRepository.save(district);
    }

    public void deleteDistrict(Integer id) {
    	District district = getDistrictById(id);
        districtRepository.delete(district);
    }
}
