package com.baonk.dto;

import lombok.Data;

import java.util.Set;

@Data
public class AuthorDto {
    private long id;
    private String name;
    private String about;
    private String portrait;
    private Set<BookDto> books;
    private Integer numBook;
}
