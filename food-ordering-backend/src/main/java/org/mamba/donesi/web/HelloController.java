package org.mamba.donesi.web;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/hello")
@CrossOrigin
public class HelloController {
	
	@GetMapping("")
	public String hello() {
		return "Hello admin!";
	}

}
