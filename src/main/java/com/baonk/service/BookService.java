package com.baonk.service;

import com.baonk.dto.BookDto;
import com.baonk.mapper.BookMapper;
import com.baonk.model.BookEntity;
import com.baonk.repository.AuthorRepository;
import com.baonk.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService implements IBookService{
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private BookMapper bookMapper;
    @Autowired
    private IAuthorService authorService;

    @Override
    public BookDto addBook(BookDto book){
        if (book != null) {
            authorService.changeNumBook(book.getAuthorId(), 1);
            return bookMapper.entityToDto(bookRepository.save(bookMapper.dtoToEntity(book)));
        }
        return null;
    }

    @Override
    public BookDto detailBook(Long id) {
        return bookMapper.entityToDto(bookRepository.findById(id).get());
    }

    @Override
    public List<BookDto> allBook() {
        List<BookEntity> bookEntities = bookRepository.findAll();
        List<BookDto> bookDtos = new ArrayList<>();
        for (BookEntity bookEntity : bookEntities){
            bookDtos.add(bookMapper.entityToDto(bookEntity));
        }
        return bookDtos;
    }

    @Override
    public boolean updateBook(BookDto bookDto) {
        if (bookDto != null){
            BookEntity bookEntity = bookRepository.getReferenceById(bookDto.getId());
            if (bookEntity != null){
                bookEntity.setName(bookDto.getName());
                bookEntity.setImage(bookDto.getImage());
                bookEntity.setGenres(bookDto.getGenres());
                bookEntity.setDescription(bookDto.getDescription());
                bookEntity.setAuthor(authorRepository.getReferenceById(bookDto.getAuthorId()));
                bookRepository.save(bookEntity);
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean deleteBook(Long id) {
        BookEntity bookEntity = bookRepository.getReferenceById(id);
        if (bookEntity != null){
            authorService.changeNumBook(bookEntity.getAuthor().getId(), -1);
            bookRepository.delete(bookEntity);
            return true;
        }
        return false;
    }
}
