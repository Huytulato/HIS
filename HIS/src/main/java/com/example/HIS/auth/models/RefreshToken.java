package com.example.HIS.auth.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "refreshtoken")
@Getter
@Setter
@NoArgsConstructor
public class RefreshToken {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @OneToOne
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;

  @Column(nullable = false, unique = true)
  private String token;

  @Column(nullable = false)
  private Instant expiryDate;
}