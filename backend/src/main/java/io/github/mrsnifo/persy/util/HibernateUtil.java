package io.github.mrsnifo.persy.util;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.HashMap;
import java.util.Map;

public class HibernateUtil {

    private static final EntityManagerFactory emf;

    static {
        try {
            // Make sure Config loads environment variables
            if (Config.DB_URL == null || Config.DB_USER == null) {
                throw new RuntimeException("DB config not loaded properly from environment variables");
            }

            // Only override JDBC properties with valid values
            Map<String, String> props = new HashMap<>();
            props.put("javax.persistence.jdbc.url", Config.DB_URL);
            props.put("javax.persistence.jdbc.user", Config.DB_USER);
            props.put("javax.persistence.jdbc.password", Config.DB_PASSWORD);

            // Now create EMF with persistence.xml + overrides
            emf = Persistence.createEntityManagerFactory("persyPU", props);

        } catch (Exception e) {
            e.printStackTrace();
            throw new ExceptionInInitializerError("Initial EntityManagerFactory failed");
        }
    }

    public static EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
}
