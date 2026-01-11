package com.farmxchain.service;

import org.springframework.stereotype.Service;

import com.farmxchain.dto.AdminDashboardResponseDto;
import com.farmxchain.repository.OrderRepository;
import com.farmxchain.repository.ProductRepository;
import com.farmxchain.repository.UserRepository;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public DashboardService(UserRepository userRepository,
                            ProductRepository productRepository,
                            OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    public AdminDashboardResponseDto getAdminDashboardStats() {

        AdminDashboardResponseDto dto = new AdminDashboardResponseDto();

        dto.setTotalUsers(userRepository.count());
        dto.setTotalFarmers(userRepository.countByRole("FARMER"));
        dto.setTotalCustomers(userRepository.countByRole("CUSTOMER"));
        dto.setTotalDistributors(userRepository.countByRole("DISTRIBUTOR"));

        dto.setTotalProducts(productRepository.count());
        dto.setTotalOrders(orderRepository.count());
        
        dto.setTotalRevenue(orderRepository.getTotalRevenue());

        return dto;
    }
}
