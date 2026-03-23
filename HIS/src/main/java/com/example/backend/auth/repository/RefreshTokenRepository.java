package com.example.backend.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import com.example.backend.auth.entity.RefreshToken;
import com.example.backend.auth.entity.User;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
  Optional<RefreshToken> findByToken(String token);
  Optional<RefreshToken> findByUserId(Long userId);

  @Modifying
  int deleteByUser(User user);
}