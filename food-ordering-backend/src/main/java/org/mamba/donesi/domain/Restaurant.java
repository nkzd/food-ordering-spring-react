package org.mamba.donesi.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Generated;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Restaurant {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message = "Name is required")
	private String name;
	@Email(message = "Email ")
	@NotBlank(message = "Email is required")
	@Column(unique = true)
	private String email;
	@NotBlank
	private String address;
	
	private String description;
	
	private String pictureUrl;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "adminUser_id", updatable = false, nullable = false)
	@JsonIgnore
	private AdminUser adminUser;

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "restaurant", orphanRemoval = true)
	@JsonIgnore
	private List<FoodArticle> foodArticles = new ArrayList<>();

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "restaurant", orphanRemoval = true)
	@JsonIgnore
	private List<Category> categories = new ArrayList<>();

	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(updatable = false)
	private Date createdAt;

	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date updatedAt;

	public Restaurant() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPictureUrl() {
		return pictureUrl;
	}

	public void setPictureUrl(String pictureUrl) {
		this.pictureUrl = pictureUrl;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public AdminUser getAdminUser() {
		return adminUser;
	}

	public void setAdminUser(AdminUser adminUser) {
		this.adminUser = adminUser;
	}

	public List<FoodArticle> getFoodArticles() {
		return foodArticles;
	}

	public void setFoodArticles(List<FoodArticle> foodArticles) {
		this.foodArticles = foodArticles;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}

	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}

}
