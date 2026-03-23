package com.example.backend.auth.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.backend.auth.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;

  private Long id;
  private String username;
  private String email;

  @JsonIgnore
  private String password;

  private Collection<? extends GrantedAuthority> authorities;

  public UserDetailsImpl(Long id, String username, String email, String password,
      Collection<? extends GrantedAuthority> authorities) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
  }

  public static UserDetailsImpl build(User user, Set<String> permissions) {
    List<GrantedAuthority> authorities = user.getRoles().stream()
        .filter(role -> role.getCode() != null && !role.getCode().trim().isEmpty())
        .map(role -> new SimpleGrantedAuthority(role.getCode().trim()))
        .collect(Collectors.toList());

    if (authorities.isEmpty()) {
      authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
    }

    if (permissions != null && !permissions.isEmpty()) {
      Set<SimpleGrantedAuthority> permissionAuthorities = permissions.stream()
          .filter(p -> p != null && !p.trim().isEmpty())
          .map(p -> new SimpleGrantedAuthority(p.trim()))
          .collect(Collectors.toSet());
      authorities.addAll(permissionAuthorities);
    }

    return new UserDetailsImpl(
        user.getId(), 
        user.getUsername(), 
        user.getEmail(),
        user.getPassword(), 
        authorities);
  }

  public static UserDetailsImpl build(User user) {
    List<GrantedAuthority> authorities = user.getRoles().stream()
        .filter(role -> role.getCode() != null && !role.getCode().trim().isEmpty())
        .map(role -> new SimpleGrantedAuthority(role.getCode().trim()))
        .collect(Collectors.toList());

    if (authorities.isEmpty()) {
      authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
    }

    return new UserDetailsImpl(
        user.getId(), 
        user.getUsername(), 
        user.getEmail(),
        user.getPassword(), 
        authorities);
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  public Long getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserDetailsImpl user = (UserDetailsImpl) o;
    return Objects.equals(id, user.id);
  }
}