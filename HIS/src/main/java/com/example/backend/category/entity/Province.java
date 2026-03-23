package com.example.backend.category.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "provinces")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Province {

    @Id
    @Column(name = "id", length = 10)
    private String id;

    @Column(name = "code", length = 20)
    private String code;

    @Column(name = "name", length = 255)
    private String name;

    @OneToMany(mappedBy = "province", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<District> districts = new ArrayList<>();
}