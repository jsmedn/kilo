package org.jsmed.kilo.jpa;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "recipes")
public class Recipe {
  @Id
  @Column(name = "id")	
  private int id = -1;
    
  @Column(name = "title", length=256)	
	private String title;
	
  @Column(name = "ingredients", length=4096)	
	private String ingredients;

  @Column(name = "preparation", length=4096)	
	private String preparation;
    
  @Column(name = "comment", length=4096)	
	private String comment;

  @Column(name = "created")	
	private Date created;

  @Column(name = "modified")	
	private Date modified;
    
  @ManyToOne
  @JoinColumn(name="userid")
  private User user;
  
  @ManyToMany
  @JoinTable(name = "recipe_to_tag",
    joinColumns = @JoinColumn(name = "recipeid"),
    inverseJoinColumns = @JoinColumn(name = "tagid")
  )
  private List<Tag> tags = new ArrayList<>();
	
  
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

  public List<Tag> getTags() {
    return tags;
  }

  public void setTags(List<Tag> tags) {
    this.tags = tags;
  }

    
    
    
}
