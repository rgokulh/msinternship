package com.sdl.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sdl.main.model.State;

@Repository
public interface StateRepository extends JpaRepository<State, Integer> {

}
