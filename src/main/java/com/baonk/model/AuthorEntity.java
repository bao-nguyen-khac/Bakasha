package com.baonk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "author")
public class AuthorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "about")
    private String about;

    @Column(name = "portrait")
    private String portrait;

    @Column(name = "numBook", columnDefinition = "integer default 0")
    private int numBooks;

//    @JsonIgnore
//    @OneToMany(mappedBy = "author")
//    private Set<BookEntity> books = new HashSet<>();
}
