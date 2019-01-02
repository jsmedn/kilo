package org.jsmed.kilo.jpa;

import java.sql.Blob;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "recipe_images")
public class RecipeImage {
  @Id
  @Column(name = "id")  
  private int id = -1;
    
  @Column(name = "mimetype", length=25)  
  private String mimetype;
  
  @Column(name = "original_image")  
  @Lob
  private Blob originalImage;

  @Column(name = "original_size", length=25)  
  private String originalSize;
    
  @Column(name = "thumbnail_image")  
  @Lob
  private Blob thumbnailImage;

  @Column(name = "thumbnail_size")  
  private String thumbnailSize;

  @ManyToOne
  @JoinColumn(name="recipeid")
  private Recipe recipe;
  
  
  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getMimetype() {
    return mimetype;
  }

  public void setMimetype(String mimetype) {
    this.mimetype = mimetype;
  }
  
  public Blob getOriginalImage() {
    return originalImage;
  }
  
  public void setOriginalImage(Blob originalImage) {
    this.originalImage = originalImage;
  }
  
  public String getOriginalSize() {
    return originalSize;
  }
  
  public void setOriginalSize(String originalSize) {
    this.originalSize = originalSize;
  }
  
  public Blob getThumbnailImage() {
    return thumbnailImage;
  }
  
  public void setThumbnailImage(Blob thumbnailImage) {
    this.thumbnailImage = thumbnailImage;
  }
  
  public String getThumbnailSize() {
    return thumbnailSize;
  }
  
  public void setThumbnailSize(String thumbnailSize) {
    this.thumbnailSize = thumbnailSize;
  }
  
  public Recipe getRecipe() {
    return recipe;
  }
  
  public void setRecipe(Recipe recipe) {
    this.recipe = recipe;
  }
  
  
    
    
}
