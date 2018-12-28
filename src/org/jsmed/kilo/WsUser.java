package org.jsmed.kilo;

import java.io.Serializable;

import org.jsmed.kilo.jpa.User;

public class WsUser implements Serializable {
	private int id;
	private String username;
	private String firstname;
	private String lastname;
	private String email;
	
	public WsUser() {
	}
	
	public WsUser(User user) {
		this.id = user.getId();
		this.username = user.getUsername();
		this.firstname = user.getFirstname();
		this.lastname = user.getLastname();
		this.email = user.getEmail();
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	public String getFullname() {
		return this.firstname + " " + this.lastname;
	}

}
