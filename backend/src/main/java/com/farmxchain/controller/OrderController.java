package com.farmxchain.controller;

import com.farmxchain.dto.OrderResponseDto;
import com.farmxchain.model.Order;
import com.farmxchain.model.Product;
import com.farmxchain.model.User;
import com.farmxchain.repository.ProductRepository;
import com.farmxchain.repository.UserRepository;
import com.farmxchain.security.JwtUtil;
import com.farmxchain.service.OrderService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.farmxchain.security.RoleValidator.requireCustomer;
import static com.farmxchain.security.RoleValidator.requireFarmer;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public OrderController(
            OrderService orderService,
            ProductRepository productRepository,
            UserRepository userRepository,
            JwtUtil jwtUtil
    ) {
        this.orderService = orderService;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // ==============================
    // 🧑 CUSTOMER → PLACE ORDER
    // ==============================
    @PostMapping("/create")
    public ResponseEntity<?> createOrder(
            @RequestBody Map<String, Object> payload,
            @RequestHeader("Authorization") String authHeader
    ) {
        User user = extractUser(authHeader);
        String role = user.getRole().toUpperCase();

        if (!role.equals("CUSTOMER") && !role.equals("DISTRIBUTOR")) {
            return ResponseEntity.status(403).body("Only customers or distributors can place orders");
        }

        Long productId = Long.valueOf(payload.get("productId").toString());
        int quantity = Integer.parseInt(payload.get("quantity").toString());

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // 🔒 ROLE vs SELL_TO CHECK
        if (role.equals("CUSTOMER") && !product.getSellTo().equalsIgnoreCase("customer")) {
            return ResponseEntity.badRequest().body("Retail customers cannot buy wholesale products");
        }

        if (role.equals("DISTRIBUTOR") && !product.getSellTo().equalsIgnoreCase("distributor")) {
            return ResponseEntity.badRequest().body("Distributors can only buy wholesale products");
        }

        if (quantity > product.getQuantity()) {
            return ResponseEntity.badRequest().body("Insufficient stock");
        }

        Order order = new Order();
        order.setProductId(product.getId());
        order.setProductName(product.getName());
        order.setFarmerId(product.getFarmerId());

        order.setBuyerId(user.getId());
        order.setBuyerRole(role);
        order.setBuyerEmail(user.getEmail());

        order.setQuantity(quantity);
        order.setPrice(product.getPrice());
        order.setTotalPrice(quantity * product.getPrice());

        return ResponseEntity.ok(orderService.createOrder(order));
    }

    // ==============================
    // 👨‍🌾 FARMER → VIEW ORDERS
    // ==============================
    @GetMapping("/farmer")
    public ResponseEntity<List<OrderResponseDto>> getFarmerOrders(
            @RequestHeader("Authorization") String authHeader
    ) {
        User farmer = extractUser(authHeader);
        requireFarmer(farmer);

        List<OrderResponseDto> response =
                orderService.getOrdersByFarmer(farmer.getId())
                        .stream()
                        .map(this::toDto)
                        .toList();

        return ResponseEntity.ok(response);
    }

    // ==============================
    // 👤 CUSTOMER → VIEW MY ORDERS
    // ==============================
    @GetMapping("/customer")
    public ResponseEntity<List<Order>> getCustomerOrders(
            @RequestHeader("Authorization") String authHeader
    ) {
        User customer = extractUser(authHeader);
        requireCustomer(customer);

        return ResponseEntity.ok(
                orderService.getOrdersByCustomer(customer.getId())
        );
    }

    // ==============================
    // 👨‍🌾 FARMER → UPDATE ORDER STATUS
    // ==============================
    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderResponseDto> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody Map<String, String> statusUpdate,
            @RequestHeader("Authorization") String authHeader
    ) {
        User farmer = extractUser(authHeader);
        requireFarmer(farmer);

        String newStatus = statusUpdate.get("status");

        Order updatedOrder = orderService.updateStatus(orderId, newStatus);
        return ResponseEntity.ok(toDto(updatedOrder));
    }

    // ==============================
    // 👤 CUSTOMER → CANCEL ORDER
    // ==============================
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelOrder(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader
    ) {
        User customer = extractUser(authHeader);
        requireCustomer(customer);

        Order order = orderService.getOrderById(id);

        if (!order.getCustomerId().equals(customer.getId())) {
            return ResponseEntity.status(403)
                    .body("Not allowed");
        }

        if (!order.getStatus().equals("PENDING")) {
            return ResponseEntity.badRequest()
                    .body("Order cannot be cancelled");
        }

        order.setStatus("CANCELLED");
        return ResponseEntity.ok(orderService.createOrder(order));
    }

    // ==============================
    // 🔧 HELPER METHODS
    // ==============================
    private User extractUser(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractUsername(token);

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private OrderResponseDto toDto(Order order) {
        OrderResponseDto dto = new OrderResponseDto();
        dto.setOrderId(order.getId());
        dto.setProductName(order.getProductName());
        dto.setQuantity(order.getQuantity());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setStatus(order.getStatus());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setCustomerEmail(order.getCustomerEmail());
        return dto;
    }
}
