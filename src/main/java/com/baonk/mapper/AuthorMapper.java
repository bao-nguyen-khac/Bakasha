package com.baonk.mapper;

import com.baonk.dto.AuthorDto;
import com.baonk.dto.BookDto;
import com.baonk.model.AuthorEntity;
import com.baonk.model.BookEntity;
import com.baonk.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class AuthorMapper {
    @Autowired
    private BookMapper bookMapper;
    @Autowired
    private BookRepository bookRepository;
    public AuthorDto entityToDto(AuthorEntity authorEntity){
        AuthorDto authorDto = new AuthorDto();
        authorDto.setId(authorEntity.getId());
        authorDto.setName(authorEntity.getName());
        authorDto.setAbout(authorEntity.getAbout());
        authorDto.setPortrait(authorEntity.getPortrait());
        Set<BookEntity> bookEntities = bookRepository.findBookEntitiesByAuthor(authorEntity);
        Set<BookDto> bookDtos = new HashSet<>();
        for (BookEntity bookEntity : bookEntities){
            bookDtos.add(bookMapper.entityToDto(bookEntity));
        }
        authorDto.setBooks(bookDtos);
        return authorDto;
    }

    public AuthorDto entityToDtoAll(AuthorEntity authorEntity){
        AuthorDto authorDto = new AuthorDto();
        authorDto.setId(authorEntity.getId());
        authorDto.setName(authorEntity.getName());
        authorDto.setAbout(authorEntity.getAbout());
        authorDto.setPortrait(authorEntity.getPortrait());
        authorDto.setNumBook(authorEntity.getNumBooks());
        return authorDto;
    }

    public AuthorEntity dtoToEntity(AuthorDto authorDto){
        AuthorEntity authorEntity = new AuthorEntity();
        authorEntity.setId(authorDto.getId());
        authorEntity.setPortrait(authorDto.getPortrait());
        authorEntity.setAbout(authorDto.getAbout());
        authorEntity.setName(authorDto.getName());

        return authorEntity;
    }
}
