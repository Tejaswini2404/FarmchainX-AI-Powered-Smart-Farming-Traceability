package com.farmxchain.repository;

import com.farmxchain.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
 
	List<Product> findByFarmerId(Long farmerId); // Fetch products for a specific farmer
	long countByFarmerId(Long farmerId);
	List<Product> findByFarmerIdAndQuantityLessThan(Long farmerId, int quantity);
//	private final ProductRepository productRepository;
	Optional<Product> findById(Long id);

	List<Product> findBySellTo(String sellType);
	List<Product> findByQuantityGreaterThan(int quantity);

	
	

}

