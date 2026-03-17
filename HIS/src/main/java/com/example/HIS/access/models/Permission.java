package com.example.HIS.access.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "permissions")
@Getter
@Setter
@NoArgsConstructor
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, length = 50)
    private String code;

    @Column(length = 100)
    private String name;

    @Column(name = "module_name", length = 100)
    private String moduleName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id")
    private Menu menu;

    public Permission(String code, String name, String moduleName, Menu menu) {
        this.code = code;
        this.name = name;
        this.moduleName = moduleName;
        this.menu = menu;
    }
}
