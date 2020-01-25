package org.mamba.donesi.web;

import java.security.Principal;

import org.mamba.donesi.domain.OrderRequest;
import org.mamba.donesi.services.MailService;
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

	@Autowired
	private MailService mailService;

	@PostMapping("/order")
	ResponseEntity<?> sendOrder(@RequestBody OrderRequest orderRequest, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;

		try {
			mailService.sendOrderRequest(orderRequest, principal.getName());
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<String>(HttpStatus.OK);
	}

}
