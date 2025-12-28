package io.github.mrsnifo.persy.service;

import io.github.mrsnifo.persy.entities.Person;
import io.github.mrsnifo.persy.utils.HibernateUtil;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

public class PersonServiceImpl implements PersonService {

    @Override
    public boolean addPerson(Person p) {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(p);
            em.getTransaction().commit();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            em.getTransaction().rollback();
            return false;
        } finally {
            em.close();
        }
    }

    @Override
    public boolean deletePerson(int id) {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            Person person = em.find(Person.class, id);
            if (person == null) return false;

            em.getTransaction().begin();
            em.remove(person);
            em.getTransaction().commit();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            em.getTransaction().rollback();
            return false;
        } finally {
            em.close();
        }
    }

    @Override
    public boolean updatePerson(Person p) {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.merge(p);
            em.getTransaction().commit();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            em.getTransaction().rollback();
            return false;
        } finally {
            em.close();
        }
    }

    @Override
    public Person getPerson(int id) {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            return em.find(Person.class, id);
        } finally {
            em.close();
        }
    }

    @Override
    public List<Person> searchPersons(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllPersons();
        }

        String[] words = query.trim().toLowerCase().split("\\s+");
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            StringBuilder jpql = new StringBuilder("SELECT p FROM Person p WHERE ");

            for (int i = 0; i < words.length; i++) {
                if (i > 0) jpql.append(" AND "); // all words must match somewhere
                jpql.append("(")
                        .append("LOWER(p.firstName) LIKE :word").append(i)
                        .append(" OR LOWER(p.lastName) LIKE :word").append(i)
                        .append(" OR LOWER(p.email) LIKE :word").append(i)
                        .append(" OR LOWER(p.phoneNumber) LIKE :word").append(i)
                        .append(")");
            }

            TypedQuery<Person> typedQuery = em.createQuery(jpql.toString(), Person.class);

            for (int i = 0; i < words.length; i++) {
                typedQuery.setParameter("word" + i, "%" + words[i] + "%");
            }

            return typedQuery.getResultList();
        } finally {
            em.close();
        }
    }

    @Override
    public List<Person> getAllPersons() {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            TypedQuery<Person> query = em.createQuery("SELECT p FROM Person p", Person.class);
            return query.getResultList();
        } finally {
            em.close();
        }
    }
}
