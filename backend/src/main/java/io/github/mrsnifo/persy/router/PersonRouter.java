package io.github.mrsnifo.persy.router;

import io.github.mrsnifo.persy.entities.Person;
import io.github.mrsnifo.persy.service.PersonServiceImpl;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@Path("/persons")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PersonRouter {

    private final PersonServiceImpl service = new PersonServiceImpl();

    @GET
    @Path("/all")
    public List<Person> getAll() {
        return service.getAllPersons();
    }

    @GET
    @Path("/{id}")
    public Person getPerson(@PathParam("id") int id) {
        return service.getPerson(id);
    }

    @GET
    @Path("/search")
    public Person getPersonByName(@QueryParam("name") String name) {
        return service.getPersonByName(name);
    }

    @POST
    public Map<String, String> addPerson(Person p) {
        Map<String, String> response = new HashMap<>();
        boolean success = service.addPerson(p);
        response.put("state", success ? "ok" : "failed");
        return response;
    }

    @PUT
    @Path("/update")
    public Map<String, String> updatePerson(Person p) {
        Map<String, String> response = new HashMap<>();
        boolean success = service.updatePerson(p);
        response.put("state", success ? "ok" : "failed");
        return response;
    }

    @DELETE
    @Path("/delete/{id}")
    public Map<String, String> deletePerson(@PathParam("id") int id) {
        Map<String, String> response = new HashMap<>();
        boolean success = service.deletePerson(id);
        response.put("state", success ? "ok" : "failed");
        return response;
    }
}
