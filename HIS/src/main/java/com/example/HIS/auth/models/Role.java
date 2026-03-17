package com.example.HIS.auth.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(length = 50, unique = true)
  private String code;

  @Column(name = "display_name", length = 100)
  private String displayName;

  @Column(length = 255)
  private String description;

  public Role(String code, String displayName, String description) {
    this.code = code;
    this.displayName = displayName;
    this.description = description;
  }
}