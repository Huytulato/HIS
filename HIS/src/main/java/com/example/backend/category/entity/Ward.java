package com.example.backend.category.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "wards")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ward {

    @Id
    @Column(name = "id", length = 10)
    private String id;

    @Column(name = "code", length = 20)
    private String code;

    @Column(name = "name", length = 255)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id", nullable = false)
    private District district;
}