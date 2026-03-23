package com.example.backend.category.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "districts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class District {

    @Id
    @Column(name = "id", length = 10)
    private String id;

    @Column(name = "code", length = 20)
    private String code;

    @Column(name = "name", length = 255)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "province_id", nullable = false)
    private Province province;

    @OneToMany(mappedBy = "district", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Ward> wards = new ArrayList<>();
}