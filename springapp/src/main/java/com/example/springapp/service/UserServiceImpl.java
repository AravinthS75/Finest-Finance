package com.example.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.springapp.config.JwtUtils;
import com.example.springapp.exception.UserExistException;
import com.example.springapp.exception.UserNameNotFoundException;
import com.example.springapp.model.AuthUser;
import com.example.springapp.model.User;
import com.example.springapp.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    public User registerUser(User user) {
        User existUser = userRepository.findByEmail(user.getEmail());
        if (existUser != null) {
            throw new UserExistException("User already exists!");
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole("USER");
            return userRepository.save(user);
        }
    }

    @Override
    public AuthUser loginUser(User loginUser) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginUser.getEmail(), loginUser.getPassword())
        );
    
        if (authentication.isAuthenticated()) {
            User user = userRepository.findByEmail(loginUser.getEmail());
            String token = jwtUtils.generateToken(loginUser.getEmail());
            return new AuthUser(
                user.getEmail(), 
                token, 
                user.getRole(), 
                user.getId(), 
                user.getName(),
                user.getProfilePicture()
            );
        }
        throw new UserNameNotFoundException("Invalid username or password");
    }

    @Override
    public User getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if(user!=null)
            return user;
        return null;
    }
}
