package com.baonk.dto;

import lombok.Data;

@Data
public class BookDto {
    private long id;
    private String name;
    private String genres;
    private String image;
    private String description;
    private Long authorId;
    private String authorName;
}
