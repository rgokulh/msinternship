package com.sdl.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sdl.main.model.District;

@Repository
public interface DistrictRepository extends JpaRepository<District, Integer> {
	@Query("SELECT d FROM District d WHERE d.state.state_id = :stateId")
	List<District> findByStateStateId(@Param("stateId") Integer stateId);
}
