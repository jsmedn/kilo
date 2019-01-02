package org.jsmed.kilo;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.FileCacheImageOutputStream;
import javax.imageio.stream.ImageOutputStream;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jsmed.kilo.jpa.RecipeImage;

public class ImageServlet extends HttpServlet {

  
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    int id = -1;
    try {
      id = Integer.parseInt(req.getParameter("id"));
    } catch ( NumberFormatException | NullPointerException e) {
    }

    InputStream is = null;
    EntityManager em = null;
    try {
      EntityManagerFactory emf = Persistence.createEntityManagerFactory("RecipePU");
      em = emf.createEntityManager();
     
      RecipeImage model = em.find(RecipeImage.class, id);
      if (model != null) {
        resp.setContentType(model.getMimetype());
        
        ServletOutputStream sos = resp.getOutputStream();
        is = model.getThumbnailImage().getBinaryStream();

        byte[] buf = new byte[1024];
        int len;
        while ((len = is.read(buf)) > 0) {
          sos.write(buf, 0, len);
        }

      } else {
        resp.setContentType("image/png");
        // create white image if no default exists
        BufferedImage bufferedimage = new BufferedImage(337, 210, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = bufferedimage.createGraphics();
        g.setBackground(Color.WHITE);
        g.clearRect(0, 0, bufferedimage.getWidth(), bufferedimage.getHeight());
        g.dispose();

        IIOImage image = new IIOImage(bufferedimage, null, null);
        Iterator<ImageWriter> iter = ImageIO.getImageWritersByFormatName("png");
        ImageWriter writer = (ImageWriter) iter.next();
        ImageWriteParam iwp = writer.getDefaultWriteParam();

        ImageOutputStream ios = new FileCacheImageOutputStream(resp.getOutputStream(), null);
        writer.setOutput(ios);
        writer.write(null, image, iwp);
        writer.dispose();
      }

      resp.flushBuffer();
    } catch (Exception ignore) {
      // Silently ignore
      System.out.println(ignore);
    } finally {
      try {
        if (is != null) {
          is.close();
        }
      } catch (Exception ignore) {}
      try {
        em.close();
      } catch ( Exception ignore ) {
      }
    }
  }

}

