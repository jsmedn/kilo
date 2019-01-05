package org.jsmed.kilo;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.jsmed.kilo.jpa.Recipe;
import org.jsmed.kilo.jpa.User;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Path("/recipes")
public class RestAPIServlet {
   @GET
   @Path("/list")
   @Produces("application/json; charset=UTF-8")
   public Response listRecipes() {
     List<WsRecipe> recipes = new ArrayList<>();

     EntityManager em = null;
     try {
       EntityManagerFactory emf = Persistence.createEntityManagerFactory("RecipePU");
       em = emf.createEntityManager();
      
       List<Recipe> models = em.createQuery(
           "SELECT r FROM Recipe r ORDER BY r.title").getResultList();
       
       for ( Recipe model : models ) {
         WsRecipe recipe = new WsRecipe(model);
         recipes.add(recipe);
       }
       
     } finally {
       try {
         em.close();
       } catch ( Exception ignore ) {
       }
     }
     
     
     Gson gson = new GsonBuilder().create(); 
     return Response.status(200).entity(gson.toJson(recipes)).build();
   }

   @GET
   @Path("/list/tag/{id}")
   @Produces("application/json; charset=UTF-8")
   public Response listRecipesByTag(@PathParam("id") Integer id) {
     List<WsRecipe> recipes = new ArrayList<>();

     EntityManager em = null;
     try {
       EntityManagerFactory emf = Persistence.createEntityManagerFactory("RecipePU");
       em = emf.createEntityManager();
      
       List<Recipe> models = em.createQuery(
           "SELECT r FROM Recipe r INNER JOIN r.tags AS t WHERE t.id = :id ORDER BY r.title").setParameter("id", id).getResultList();
       
       for ( Recipe model : models ) {
         recipes.add(new WsRecipe(model));
       }
       
     } finally {
       try {
         em.close();
       } catch ( Exception ignore ) {
       }
     }
     
     
     Gson gson = new GsonBuilder().create(); 
     return Response.status(200).entity(gson.toJson(recipes)).build();
   }

   @GET
   @Path("/recipe/{id}")
   @Produces("application/json; charset=UTF-8")
   public Response getRecipe(@PathParam("id") Integer id) {
     WsRecipe recipe = new WsRecipe();
     EntityManager em = null;
     try {
       EntityManagerFactory emf = Persistence.createEntityManagerFactory("RecipePU");
       em = emf.createEntityManager();
      
       Recipe model = em.find(Recipe.class, id);
      
       if ( model != null ) {
         recipe = new WsRecipe(model);

         
         List<Integer> imageids = em.createQuery(
             "SELECT ri.id FROM RecipeImage ri INNER JOIN ri.recipe AS r WHERE r.id = :id")
             .setParameter("id", model.getId())
             .getResultList();

         recipe.getImageids().addAll(imageids);
       }
     } finally {
       try {
         em.close();
       } catch ( Exception ignore ) {
       }
     }
     
     Gson gson = new GsonBuilder().create(); 
     return Response.status(200).entity(gson.toJson(recipe)).build();
   }
   
   
   @POST
   @Path("/login/{username}/{password}")
   @Produces("application/json; charset=UTF-8")
   public Response login(@PathParam("username") String username, @PathParam("password") String password) {
     EntityManager em = null;
     try {
       EntityManagerFactory emf = Persistence.createEntityManagerFactory("RecipePU");
       em = emf.createEntityManager();
      
         
       User user = (User)em.createQuery(
           "SELECT u FROM User AS u WHERE u.username = :usernamd AND u.password = :password")
           .setParameter("username", username)
           .setParameter("password", md5(password))
           .setMaxResults(1)
           .getSingleResult();
       
       if ( user != null ) {
         WsUser wsuser = new WsUser(user);
         Gson gson = new GsonBuilder().create(); 
         return Response.status(200).entity(gson.toJson(wsuser)).build();
       }

     } finally {
       try {
         em.close();
       } catch ( Exception ignore ) {
       }
     }
     
     Gson gson = new GsonBuilder().create(); 
     return Response.status(200).entity(gson.toJson(null)).build();
   }

  private String md5(String data) {
    MessageDigest digest = null;

    if (data == null) {
      return null;
    }
  
    if (digest == null) {
      try {
        digest = MessageDigest.getInstance("MD5");
      } catch (NoSuchAlgorithmException nsae) {
      }
    }
    // Now, compute hash.
    digest.update(data.getBytes());
    byte[] hash = digest.digest();
  
    StringBuffer buf = new StringBuffer(hash.length * 2);
    int i;
  
    for (i = 0; i < hash.length; i++) {
      if ((hash[i] & 0xff) < 0x10) {
        buf.append("0");
      }
      buf.append(Long.toString(hash[i] & 0xff, 16));
    }
  
    return buf.toString();
  }

   
}

