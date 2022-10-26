package com.baonk.mapper;

import com.baonk.dto.BookDto;
import com.baonk.model.AuthorEntity;
import com.baonk.model.BookEntity;
import com.baonk.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BookMapper {
    @Autowired
    private AuthorRepository authorRepository;

    public BookDto entityToDto(BookEntity bookEntity){
        BookDto bookDto = new BookDto();
        bookDto.setId(bookEntity.getId());
        bookDto.setName(bookEntity.getName());
        bookDto.setImage(bookEntity.getImage());
        bookDto.setGenres(bookEntity.getGenres());
        bookDto.setDescription(bookEntity.getDescription());
        bookDto.setAuthorId(bookEntity.getAuthor().getId());
        bookDto.setAuthorName(authorRepository.getReferenceById(bookEntity.getAuthor().getId()).getName());
        return bookDto;
    }

    public BookEntity dtoToEntity(BookDto bookDto){
        BookEntity bookEntity = new BookEntity();
        bookEntity.setId(bookDto.getId());
        bookEntity.setName(bookDto.getName());
        bookEntity.setImage(bookDto.getImage());
        bookEntity.setGenres(bookDto.getGenres());
        bookEntity.setDescription(bookDto.getDescription());
        AuthorEntity author = authorRepository.findById(bookDto.getAuthorId()).get();
        bookEntity.setAuthor(author);
        return bookEntity;
    }
}
