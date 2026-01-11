package com.farmxchain.service;

import com.farmxchain.dto.AdminUserResponseDto;
import com.farmxchain.model.User;
import com.farmxchain.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final UserRepository userRepository;

    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<AdminUserResponseDto> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .map(user -> new AdminUserResponseDto(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole()   // role is already String
                ))
                .collect(Collectors.toList());
    }
}
