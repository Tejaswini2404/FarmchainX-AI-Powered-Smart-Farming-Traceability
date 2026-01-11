package com.farmxchain.security;
import com.farmxchain.model.User;
public class RoleValidator {
    public static void requireFarmer(User user) {
        if (!"FARMER".equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("Access denied: Farmer role required");
        }
    }

    public static void requireCustomer(User user) {
        if (!"CUSTOMER".equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("Access denied: Customer role required");
        }
    }
    public static void requireDistributor(User user) {
        if (!"Distributor".equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("Access denied: Distributor role required");
        }
    }
    public static void requireAdmin(User user) {
        if (!"Admin".equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("Access denied: Admin role required");
        }
    }
}
