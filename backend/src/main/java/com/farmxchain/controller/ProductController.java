package com.farmxchain.controller;

import com.farmxchain.model.Product;
import com.farmxchain.model.User;
import com.farmxchain.repository.ProductRepository;
import com.farmxchain.repository.UserRepository;
import com.farmxchain.security.JwtUtil;
import com.farmxchain.service.ImageUploadService;
import com.farmxchain.service.ProductService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageUploadService imageUploadService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // ==============================
    // 🧺 FARMER: ADD PRODUCT
    // ==============================
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(
            @RequestParam("images") MultipartFile[] images,
            @RequestParam("name") String name,
            @RequestParam("type") String type,
            @RequestParam("harvestDate") String harvestDate,
            @RequestParam("quantity") int quantity,
            @RequestParam("price") double price,
            @RequestParam("discount") double discount,
            @RequestParam("sellTo") String sellTo,
            @RequestParam(value = "ai_quality", required = false) String aiQuality,
            @RequestHeader("Authorization") String authHeader
    ) throws Exception {

        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractUsername(token);

        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        Product product = new Product();
        product.setName(name);
        product.setType(type);
        product.setHarvestDate(LocalDate.parse(harvestDate));
        product.setQuantity(quantity);
        product.setPrice(price);
        product.setDiscount(discount);
        product.setSellTo(sellTo);
        product.setQualityGrade(
                aiQuality != null && !aiQuality.isEmpty() ? aiQuality : "B"
        );

        List<String> imageUrls = imageUploadService.uploadMultiple(images);
        product.setImageUrls(imageUrls);

        product.setFarmerId(farmer.getId());

        return ResponseEntity.ok(productService.addProduct(product));
    }

    // ==============================
    // 🌾 FARMER: MY CROPS
    // ==============================
    @GetMapping("/my-crops")
    public List<Product> getMyCrops(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractUsername(token);

        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        return productRepository.findByFarmerId(farmer.getId());
    }

    // ==============================
    // 🚚 DISTRIBUTOR: WHOLESALE MARKET
    // ==============================
    @GetMapping("/wholesale")
    @PreAuthorize("hasRole('DISTRIBUTOR')")
    public List<Product> getWholesaleProducts() {
        return productRepository.findByQuantityGreaterThan(0);
    }

    // ==============================
    // 🧑 CUSTOMER: RETAIL PRODUCTS
    // ==============================
    @GetMapping("/customer")
    public List<Product> getCustomerProducts() {
        return productRepository.findBySellTo("CUSTOMER");
    }

    // ==============================
    // ✏ UPDATE PRODUCT
    // ==============================
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody Product productDetails
    ) {
        Product existingProduct = productService.getProductById(id);

        existingProduct.setName(productDetails.getName());
        existingProduct.setPrice(productDetails.getPrice());
        existingProduct.setQuantity(productDetails.getQuantity());
        existingProduct.setSellTo(productDetails.getSellTo());
        existingProduct.setDiscount(productDetails.getDiscount());

        return ResponseEntity.ok(productService.addProduct(existingProduct));
    }

    // ==============================
    // ❌ DELETE PRODUCT
    // ==============================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }
}
