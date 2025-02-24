package com.example.springapp.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
    User findByRole(String role);
    User findById(int userId);
}
