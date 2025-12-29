package io.github.mrsnifo.persy.utils;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.HashMap;
import java.util.Map;

public class HibernateUtil {

    private static final EntityManagerFactory emf;

    static {
        try {
            if (Config.DB_URL == null || Config.DB_USER == null) {
                throw new RuntimeException("DB config not loaded properly from environment variables");
            }

            Map<String, String> props = new HashMap<>();
            props.put("javax.persistence.jdbc.url", Config.DB_URL);
            props.put("javax.persistence.jdbc.user", Config.DB_USER);
            props.put("javax.persistence.jdbc.password", Config.DB_PASSWORD);

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
