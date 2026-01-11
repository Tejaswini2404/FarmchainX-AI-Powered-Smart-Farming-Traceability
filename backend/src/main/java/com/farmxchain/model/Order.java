package com.farmxchain.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔗 Product info
    @Column(nullable = false)
    private Long productId;

    @Column(nullable = false)
    private String productName;

    // 👨‍🌾 Farmer
    @Column(nullable = false)
    private Long farmerId;

    // 👤 Buyer (Customer / Distributor)
    @Column(nullable = false)
    private Long customerId;

    @Column(nullable = false)
    private String customerEmail;

    // 📦 Order details
    private int quantity;

    private double price;

    private double totalPrice;

    // 📌 Order status
    private String status; // PENDING, ACCEPTED, REJECTED, DELIVERED

    private LocalDateTime createdAt;

    // ✅ REQUIRED by Hibernate
    public Order() {}

    // ✅ Auto-set values
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = "PENDING";
        }
    }

    // ===== GETTERS & SETTERS =====

    public Long getId() { return id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public Long getFarmerId() { return farmerId; }
    public void setFarmerId(Long farmerId) { this.farmerId = farmerId; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
