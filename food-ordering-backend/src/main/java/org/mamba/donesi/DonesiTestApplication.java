package org.mamba.donesi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class DonesiTestApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(DonesiTestApplication.class, args);
	}

}
