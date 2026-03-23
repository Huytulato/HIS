package com.example.backend.auth.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.auth.exception.TokenRefreshException;
import com.example.backend.auth.entity.RefreshToken;
import com.example.backend.auth.entity.Role;
import com.example.backend.auth.entity.User;
import com.example.backend.auth.payload.request.LoginRequest;
import com.example.backend.auth.payload.request.SignupRequest;
import com.example.backend.auth.payload.request.TokenRefreshRequest;
import com.example.backend.auth.payload.response.JwtResponse;
import com.example.backend.auth.payload.response.MessageResponse;
import com.example.backend.auth.payload.response.TokenRefreshResponse;
import com.example.backend.auth.repository.RoleRepository;
import com.example.backend.auth.repository.UserRepository;
import com.example.backend.auth.security.jwt.JwtUtils;
import com.example.backend.auth.security.services.RefreshTokenService;
import com.example.backend.auth.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  RefreshTokenService refreshTokenService;

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    String jwt = jwtUtils.generateJwtToken(authentication);

    List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
        .collect(Collectors.toList());

    RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

    return ResponseEntity.ok(new JwtResponse(jwt, refreshToken.getToken(), userDetails.getId(),
        userDetails.getUsername(), userDetails.getEmail(), roles));
  }

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (!signUpRequest.getPassword().equals(signUpRequest.getConfirmPassword())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Passwords do not match!"));
    }

    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
    }

    User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
        encoder.encode(signUpRequest.getPassword()));

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByCode("ROLE_USER")
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
        case "admin":
          Role adminRole = roleRepository.findByCode("ROLE_ADMIN")
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(adminRole);
          break;
        case "mod":
          Role modRole = roleRepository.findByCode("ROLE_MODERATOR")
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(modRole);
          break;
        default:
          Role userRole = roleRepository.findByCode("ROLE_USER")
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  @PostMapping("/refreshtoken")
  public ResponseEntity<?> refreshtoken(@Valid @RequestBody TokenRefreshRequest request) {
    String requestRefreshToken = request.getRefreshToken();

    return refreshTokenService.findByToken(requestRefreshToken)
        .map(refreshTokenService::verifyExpiration)
        .map(RefreshToken::getUser)
        .map(user -> {
          String token = jwtUtils.generateTokenFromUsername(user.getUsername());
          return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
        })
        .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
            "Refresh token is not in database!"));
  }
  
  @PostMapping("/logout")
  public ResponseEntity<?> logoutUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.getPrincipal() instanceof UserDetailsImpl) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();
        refreshTokenService.deleteByUserId(userId);
    }
    return ResponseEntity.ok(new MessageResponse("Log out successful!"));
  }
}