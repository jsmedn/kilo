package org.jsmed.kilo;

import java.io.Serializable;

import org.jsmed.kilo.jpa.Tag;

public class WsTag implements Serializable {
	private int id;
	private String title;
	private String description;
	
	public WsTag() {
	}
	
	public WsTag(Tag tag) {
		this.id = tag.getId();
		this.title = tag.getTitle();
		//this.description = tag.getDescription();
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

}
