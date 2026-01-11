package com.farmxchain.service;

import com.farmxchain.model.Product;
import com.farmxchain.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertService {

    private final ProductRepository productRepository;

    public AlertService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // 🚨 Low stock alerts (<10kg)
    public List<Product> getLowStockProducts(Long farmerId) {
        return productRepository.findByFarmerIdAndQuantityLessThan(farmerId, 10);
    }
}
