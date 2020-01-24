package org.mamba.donesi.web;

import java.security.Principal;
import java.util.Arrays;
import java.util.List;

import org.mamba.donesi.domain.Order;
import org.mamba.donesi.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class OrderController {
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("/order")
	ResponseEntity<?> sendOrder(@RequestBody Order[] orders, BindingResult result) {
		
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		
		List<Order> allOrders = Arrays.asList(orders);
		
		StringBuilder b = new StringBuilder();
		try {
			allOrders.forEach(b::append);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);	
		}
		
		return new ResponseEntity<String>(b.toString(),HttpStatus.OK);
	}
	
}
