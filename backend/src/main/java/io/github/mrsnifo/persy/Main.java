package io.github.mrsnifo.persy;

import io.github.mrsnifo.persy.utils.Config;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;

import java.net.URI;

public class Main {
    public static void main(String[] args) {
        ResourceConfig rc = new ResourceConfig().packages("io.github.mrsnifo.persy.router");

        int port = Config.SERVER_PORT;
        URI uri = URI.create("http://localhost:" + port + "/api");

        GrizzlyHttpServerFactory.createHttpServer(uri, rc);
        System.out.println("Server running at " + uri);
    }
}
