package com.example.HIS.auth.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.HIS.auth.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);

  @Query("SELECT u FROM User u JOIN u.roles r WHERE r.id = :roleId")
  List<User> findByRoleId(Integer roleId);
}