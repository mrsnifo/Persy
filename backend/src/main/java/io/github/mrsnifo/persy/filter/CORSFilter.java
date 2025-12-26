package io.github.mrsnifo.persy.filter;

import io.github.mrsnifo.persy.utils.Config;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

@Provider
public class CORSFilter implements ContainerResponseFilter {

    @Override
    public void filter(ContainerRequestContext request, ContainerResponseContext response) throws IOException {

        String origin = request.getHeaderString("Origin");
        String allowedOrigins = Config.ALLOWED_ORIGINS;

        if ("*".equals(allowedOrigins)) {
            response.getHeaders().add("Access-Control-Allow-Origin", "*");
        } else if (origin != null && allowedOrigins.contains(origin)) {
            response.getHeaders().add("Access-Control-Allow-Origin", origin);
        }

        response.getHeaders().add("Access-Control-Allow-Headers", "content-type, authorization");
        response.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

        if ("OPTIONS".equals(request.getMethod())) {
            response.setStatus(Response.Status.OK.getStatusCode());
        }
    }
}