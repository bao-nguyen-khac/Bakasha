package com.baonk.service;

import com.baonk.dto.AuthorDto;
import com.baonk.mapper.AuthorMapper;
import com.baonk.model.AuthorEntity;
import com.baonk.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthorService implements IAuthorService{
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private AuthorMapper authorMapper;

    @Override
    public AuthorDto addAuthor(AuthorDto author){
        if (author != null) {
            return authorMapper.entityToDto(authorRepository.save(authorMapper.dtoToEntity(author)));
        }
        return null;
    }

    @Override
    public List<AuthorDto> allAuthor() {
        List<AuthorEntity> authorEntities = authorRepository.findAll();
        List<AuthorDto> authorDtos = new ArrayList<>();
        for (AuthorEntity authorEntity : authorEntities){
            authorDtos.add(authorMapper.entityToDtoAll(authorEntity));
        }
        return authorDtos;
    }

    @Override
    public AuthorDto detailAuthor(Long id) {
        return authorMapper.entityToDto(authorRepository.findById(id).get());
    }
    @Override
    public boolean changeNumBook(Long id, Integer quantity){
        AuthorEntity authorEntity = authorRepository.getReferenceById(id);
        authorEntity.setNumBooks(authorEntity.getNumBooks() + quantity);
        return true;
    }

    @Override
    public boolean updateAuthor(AuthorDto authorDto) {
        if (authorDto != null){
            AuthorEntity authorEntity = authorRepository.getReferenceById(authorDto.getId());
            if (authorEntity != null){
                authorEntity.setName(authorDto.getName());
                authorEntity.setAbout(authorDto.getAbout());
                authorEntity.setPortrait(authorDto.getPortrait());
                authorRepository.save(authorEntity);
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean deleteAuthor(Long id) {
        AuthorEntity authorEntity = authorRepository.getReferenceById(id);
        if (authorEntity != null){
            authorRepository.delete(authorEntity);
            return true;
        }
        return false;
    }
}
