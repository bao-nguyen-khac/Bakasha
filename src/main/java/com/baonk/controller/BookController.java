package com.baonk.controller;

import com.baonk.dto.BookDto;
import com.baonk.mapper.BookMapper;
import com.baonk.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("/book")
public class BookController {
    @Autowired
    public IBookService bookService;
    @Autowired
    public BookMapper bookMapper;
    @PostMapping("/new")
    public ResponseEntity<String> addBook (@RequestBody BookDto bookDto){
        bookService.addBook(bookDto);
        return new ResponseEntity<>("Create successful", HttpStatus.CREATED);
    }

    @GetMapping("detail")
    public ResponseEntity<BookDto> detailBook (@RequestParam("id") Long id){
        BookDto bookDto = bookService.detailBook(id);
        return new ResponseEntity<>(bookDto, HttpStatus.OK);
    }

    @GetMapping()
    public List<BookDto> allBook(){
        List<BookDto> allBook = bookService.allBook();
        return allBook;
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateBook(@RequestBody BookDto bookDto) {
        if (bookService.updateBook(bookDto)){
            return new ResponseEntity<>("Update successful", HttpStatus.OK);
        };
        return null;
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteBook(@RequestParam("id") Long id){
        if (bookService.deleteBook(id)){
            return new ResponseEntity<>("Delete successful", HttpStatus.OK);
        };
        return null;
    }

}
