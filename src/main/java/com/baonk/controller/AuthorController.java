package com.baonk.controller;

import com.baonk.dto.AuthorDto;
import com.baonk.service.IAuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin()
@RestController
@RequestMapping("/author")
public class AuthorController {
    @Autowired
    private IAuthorService authorService;
    @PostMapping("/new")
    public ResponseEntity<String> addAuthor(@RequestBody AuthorDto authorDto){
        authorService.addAuthor(authorDto);
        return new ResponseEntity<>("Create successful ", HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<AuthorDto>> allAuthor(){
        List<AuthorDto> author = authorService.allAuthor();
        return new ResponseEntity<>(author, HttpStatus.OK);
    }

    @GetMapping("/detail")
    public ResponseEntity<AuthorDto> detailAuthor(@RequestParam("id") Long id){
        AuthorDto author = authorService.detailAuthor(id);
        return new ResponseEntity<>(author, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateAuthor(@RequestBody AuthorDto authorDto) {
        if (authorService.updateAuthor(authorDto)){
            return new ResponseEntity<>("Update successful", HttpStatus.OK);
        };
        return null;
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteAuthor(@RequestParam("id") Long id){
        if (authorService.deleteAuthor(id)){
            return new ResponseEntity<>("Delete successful", HttpStatus.OK);
        };
        return null;
    }
}
