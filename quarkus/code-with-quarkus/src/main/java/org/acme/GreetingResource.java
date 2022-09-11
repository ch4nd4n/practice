package org.acme;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/greetings")
public class GreetingResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("hello")
    public String hello() {
        return "Hello from RESTEasy Reactive";
    }

    @GET
    @Path("/messages/{msg}")
    public String getMessage(@PathParam("msg") String msg) {
      return msg;
    }
}
