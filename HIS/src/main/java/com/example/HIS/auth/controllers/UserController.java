package com.example.HIS.auth.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.HIS.auth.models.User;
import com.example.HIS.auth.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userRepository.findAll().stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    public static class UserResponse {
        private Long id;
        private String username;
        private String email;

        public UserResponse(Long id, String username, String email) {
            this.id = id;
            this.username = username;
            this.email = email;
        }

        public Long getId() { return id; }
        public String getUsername() { return username; }
        public String getEmail() { return email; }
    }
}
