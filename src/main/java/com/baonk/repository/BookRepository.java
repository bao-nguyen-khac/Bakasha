package com.baonk.repository;

import com.baonk.model.AuthorEntity;
import com.baonk.model.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface BookRepository extends JpaRepository<BookEntity, Long> {
    public Set<BookEntity> findBookEntitiesByAuthor(AuthorEntity author);
}
