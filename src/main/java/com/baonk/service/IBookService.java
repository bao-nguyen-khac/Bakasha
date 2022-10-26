package com.baonk.service;

import com.baonk.dto.BookDto;

import java.util.List;

public interface IBookService {
    public BookDto addBook(BookDto book);

    BookDto detailBook(Long id);

    boolean updateBook(BookDto bookDto);

    boolean deleteBook(Long id);

    List<BookDto> allBook();
}
