package org.jsmed.kilo;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ImageServlet extends HttpServlet {

  
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    try {
      
      String path = req.getPathInfo();
      
      String message = "";
      
      if ( path.indexOf( "recipe.php") > 0 ) {
        message = "This url no longer exists, the new url is: /recipe/" + req.getParameter("id");
      } else {
        message = "This url no longer exists, the new url is: /";
      }
      
      resp.getWriter().write(message);


      resp.flushBuffer();
    } catch (Exception ignore) {
      // Silently ignore
      System.out.println(ignore);
    }
  }

}

