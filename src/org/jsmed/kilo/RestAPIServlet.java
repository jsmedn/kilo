package org.jsmed.kilo;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.jsmed.kilo.jpa.Recipe;

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
   
   

   
}

