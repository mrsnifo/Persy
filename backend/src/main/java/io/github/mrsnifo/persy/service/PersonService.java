package io.github.mrsnifo.persy.service;

import io.github.mrsnifo.persy.entities.Person;
import java.util.List;

public interface PersonService {
    boolean addPerson(Person p);

    boolean deletePerson(int id);

    boolean updatePerson(Person p);

    Person getPerson(int id);

    Person getPersonByName(String name);

    List<Person> getAllPersons();
}
