package com.webapp.javabackend.controller;

import com.webapp.javabackend.exception.UserNotFoundException;
import com.webapp.javabackend.model.User;
import com.webapp.javabackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {


    @Autowired
    private UserRepository userRepository;

    @PostMapping("/postuser")
    public User newUser(@RequestBody User newUser) {


        return userRepository.save(newUser);
    }

    @GetMapping("/getusers")
    public List<User> getAllUsers() {
        return userRepository.findAll();

    }

    @DeleteMapping("deleteusers")
    public void deleteAllUsers() {
        userRepository.deleteAll();
        getAllUsers();
    }

    @DeleteMapping("delbyid")
    public void deleteById(@RequestParam long id) {
        userRepository.deleteById(id);
        getAllUsers();

    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow(() -> {
            return new UserNotFoundException(id);
        });
    }

    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id) {
        return userRepository.findById(id).map(user -> {
            user.setUsername(newUser.getUsername());
            user.setName(newUser.getName());
            user.setEmail(newUser.getEmail());
            return userRepository.save(user);

        }).orElseThrow(() -> {
            return new UserNotFoundException(id);
        });
    }

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User  deleted";
    }
}
