package com.example.HIS.auth.security.services;

import com.example.HIS.auth.exception.TokenRefreshException;
import com.example.HIS.auth.models.RefreshToken;
import com.example.HIS.auth.repository.RefreshTokenRepository;
import com.example.HIS.auth.repository.UserRepository;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RefreshTokenService {

  @Value("${his.app.jwtRefreshExpirationMs}")
  private Long refreshTokenDurationMs;

  @Autowired
  private RefreshTokenRepository refreshTokenRepository;

  @Autowired
  private UserRepository userRepository;

  public Optional<RefreshToken> findByToken(String token) {
    return refreshTokenRepository.findByToken(token);
  }

  @Transactional
  public RefreshToken createRefreshToken(Long userId) {
    RefreshToken refreshToken = refreshTokenRepository.findByUserId(userId).orElse(new RefreshToken());

    refreshToken.setUser(userRepository.findById(userId).get());
    refreshToken.setExpiryDate(
      Instant.now().plusMillis(refreshTokenDurationMs)
    );
    refreshToken.setToken(UUID.randomUUID().toString());

    return refreshTokenRepository.save(refreshToken);
  }

  public RefreshToken verifyExpiration(RefreshToken token) {
    if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
      refreshTokenRepository.delete(token);
      throw new TokenRefreshException(
        token.getToken(),
        "Refresh token was expired. Please make a new signin request"
      );
    }

    return token;
  }

  @Transactional
  public int deleteByUserId(Long userId) {
    return refreshTokenRepository.deleteByUser(
      userRepository.findById(userId).get()
    );
  }
}
