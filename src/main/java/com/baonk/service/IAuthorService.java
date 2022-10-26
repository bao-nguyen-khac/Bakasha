package com.baonk.service;

import com.baonk.dto.AuthorDto;

import java.util.List;

public interface IAuthorService {
    public AuthorDto addAuthor(AuthorDto author);

    public List<AuthorDto> allAuthor();

    AuthorDto detailAuthor(Long id);

    boolean changeNumBook(Long id, Integer quantity);

    boolean updateAuthor(AuthorDto authorDto);

    boolean deleteAuthor(Long id);
}
