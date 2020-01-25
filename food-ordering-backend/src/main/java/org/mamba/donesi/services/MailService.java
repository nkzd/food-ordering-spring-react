package org.mamba.donesi.services;

import java.util.Arrays;
import java.util.List;

import org.mamba.donesi.domain.AppUser;
import org.mamba.donesi.domain.Order;
import org.mamba.donesi.domain.OrderRequest;
import org.mamba.donesi.domain.UserInfo;
import org.mamba.donesi.repositories.AppUserRepository;
import org.mamba.donesi.repositories.FoodArticleRepository;
import org.mamba.donesi.repositories.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
	@Autowired
	private JavaMailSender javaMailSender;

	@Autowired
	private FoodArticleRepository foodArticleRepository;

	@Autowired
	private RestaurantRepository restaurantRepository;

	@Autowired
	private AppUserRepository appUserRepository;

	private void sendEmail(String restaurantEmail, String userTemplate, String orderTemplate) {

		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setTo(restaurantEmail);

		msg.setSubject("New food order");
		msg.setText(userTemplate + "\n" + orderTemplate);

		javaMailSender.send(msg);

	}

	public void sendOrderRequest(OrderRequest orderRequest, String username) throws Exception {

		String restaurantEmail = restaurantRepository.getById(orderRequest.getRestaurantId()).getEmail();

		AppUser appUser = appUserRepository.getByUsername(username);
		UserInfo userInfo = appUser.getUserInfo();

		String userTemplate = "Deliver to: " + userInfo.getFirstName() + " " + userInfo.getLastName() + " on address: "
				+ orderRequest.getDeliveryAddress() + " \n";

		List<Order> allOrders = Arrays.asList(orderRequest.getBasketState());
		StringBuilder b = new StringBuilder();
		allOrders.forEach(order -> b.append(order.toEmailTemplate()));

		String orderTemplate = b.toString();

		sendEmail(restaurantEmail, userTemplate, orderTemplate);
	}
}
