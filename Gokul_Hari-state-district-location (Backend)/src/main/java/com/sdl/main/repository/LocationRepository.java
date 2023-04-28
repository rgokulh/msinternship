package com.sdl.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sdl.main.model.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {
	@Query("SELECT l FROM Location l WHERE l.district.district_id = :districtId")
	List<Location> findByDistrictDistrictId(@Param("districtId") Integer districtId);
}
