package com.farmxchain.repository;

import com.farmxchain.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByFarmerId(Long farmerId);
    @Query("SELECT COALESCE(SUM(o.totalPrice), 0) FROM Order o")
    double getTotalRevenue();


    List<Order> findByCustomerId(Long customerId);
}
