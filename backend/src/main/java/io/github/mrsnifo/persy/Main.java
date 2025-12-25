package io.github.mrsnifo.persy;

import io.github.mrsnifo.persy.utils.Config;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;

import java.net.URI;

public class Main {
    public static void main(String[] args) {
        ResourceConfig rc = new ResourceConfig().packages("io.github.mrsnifo.persy.router");
        URI uri = URI.create("http://localhost:" + Config.SERVER_PORT + "/api");
        GrizzlyHttpServerFactory.createHttpServer(uri, rc);
        System.out.println("Server running at " + uri);
    }
}
