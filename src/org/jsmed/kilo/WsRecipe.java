package org.jsmed.kilo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.jsmed.kilo.jpa.Recipe;
import org.jsmed.kilo.jpa.Tag;

public class WsRecipe implements Serializable {
	private int id;
	private String title;
	private String ingredients;
	private String preparation;
	private String comment;
	private Date created;
	private Date modified;
	private WsUser author;
	private List<WsTag> tags = new ArrayList<>();
	
	public WsRecipe() {
	}
	
	public WsRecipe(Recipe recipe) {
		this.id = recipe.getId();
		this.title = recipe.getTitle();
		this.ingredients = recipe.getIngredients();
		this.preparation = recipe.getPreparation();
		this.comment = recipe.getComment();
		this.created = recipe.getCreated();
		this.modified = recipe.getModified();
		this.author = new WsUser(recipe.getUser());
		
		for ( Tag tag : recipe.getTags() ) {
		  this.tags.add(new WsTag(tag));
		}
		
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
	public String getIngredients() {
		return ingredients;
	}
	public void setIngredients(String ingredients) {
		this.ingredients = ingredients;
	}
	public String getPreparation() {
		return preparation;
	}
	public void setPreparation(String preparation) {
		this.preparation = preparation;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
	public Date getModified() {
		return modified;
	}
	public void setModified(Date modified) {
		this.modified = modified;
	}
	public WsUser getAuthor() {
		return author;
	}
	public void setAuthor(WsUser author) {
		this.author = author;
	}

  public List<WsTag> getTags() {
    return tags;
  }

  public void setTags(List<WsTag> tags) {
    this.tags = tags;
  }
	
	

}
