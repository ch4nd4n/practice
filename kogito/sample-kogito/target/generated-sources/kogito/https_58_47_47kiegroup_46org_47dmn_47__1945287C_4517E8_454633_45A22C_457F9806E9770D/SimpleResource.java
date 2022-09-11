/*
 * Copyright 2021 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package https_58_47_47kiegroup_46org_47dmn_47__1945287C_4517E8_454633_45A22C_457F9806E9770D;

import java.util.stream.Collectors;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.kie.kogito.Application;
import org.kie.kogito.dmn.rest.DMNEvaluationErrorException;
import org.kie.kogito.dmn.rest.DMNJSONUtils;
import org.kie.kogito.dmn.rest.KogitoDMNResult;
import org.kie.kogito.dmn.util.StronglyTypedUtils;

@Path("/simple")
public class SimpleResource {

    @javax.inject.Inject()
    Application application;

    private static final String KOGITO_DECISION_INFOWARN_HEADER = "X-Kogito-decision-messages";

    private static final String KOGITO_EXECUTION_ID_HEADER = "X-Kogito-execution-id";

    private static final com.fasterxml.jackson.databind.ObjectMapper objectMapper = new com.fasterxml.jackson.databind.ObjectMapper().registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule()).registerModule(new com.fasterxml.jackson.databind.module.SimpleModule().addSerializer(org.kie.dmn.feel.lang.types.impl.ComparablePeriod.class, new org.kie.kogito.dmn.rest.DMNFEELComparablePeriodSerializer())).disable(com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS).disable(com.fasterxml.jackson.databind.SerializationFeature.WRITE_DURATIONS_AS_TIMESTAMPS);

    @javax.ws.rs.core.Context
    private org.jboss.resteasy.spi.HttpResponse httpResponse;

    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @org.eclipse.microprofile.openapi.annotations.parameters.RequestBody(content = @org.eclipse.microprofile.openapi.annotations.media.Content(mediaType = "application/json", schema = @org.eclipse.microprofile.openapi.annotations.media.Schema(ref = "/dmnDefinitions.json#/definitions/ns1InputSet1")), description = "DMN input")
    @org.eclipse.microprofile.openapi.annotations.responses.APIResponse(content = @org.eclipse.microprofile.openapi.annotations.media.Content(mediaType = "application/json", schema = @org.eclipse.microprofile.openapi.annotations.media.Schema(ref = "/dmnDefinitions.json#/definitions/ns1OutputSet1")), description = "DMN output")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json", schema = @io.swagger.v3.oas.annotations.media.Schema(ref = "/dmnDefinitions.json#/definitions/ns1InputSet1")), description = "DMN input")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json", schema = @io.swagger.v3.oas.annotations.media.Schema(ref = "/dmnDefinitions.json#/definitions/ns1OutputSet1")), description = "DMN output")
    public Response dmn(java.util.Map<String, Object> variables) {
        org.kie.kogito.decision.DecisionModel decision = application.get(org.kie.kogito.decision.DecisionModels.class).getDecisionModel("https://kiegroup.org/dmn/_1945287C-17E8-4633-A22C-7F9806E9770D", "simple");
        org.kie.dmn.api.core.DMNResult decisionResult = decision.evaluateAll(DMNJSONUtils.ctx(decision, variables));
        enrichResponseHeaders(decisionResult);
        KogitoDMNResult result = new KogitoDMNResult("https://kiegroup.org/dmn/_1945287C-17E8-4633-A22C-7F9806E9770D", "simple", decisionResult);
        return extractContextIfSucceded(result);
    }

    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String dmn() throws java.io.IOException {
        return new String(org.drools.core.util.IoUtils.readBytesFromInputStream(this.getClass().getResourceAsStream(org.kie.dmn.feel.codegen.feel11.CodegenStringUtil.escapeIdentifier("simple") + ".dmn_nologic")));
    }

    private Response extractContextIfSucceded(KogitoDMNResult result) {
        if (!result.hasErrors()) {
            return Response.ok(buildResponse(result.getDmnContext())).build();
        } else {
            return buildFailedEvaluationResponse(result);
        }
    }

    private Response buildFailedEvaluationResponse(KogitoDMNResult result) {
        return Response.status(javax.ws.rs.core.Response.Status.INTERNAL_SERVER_ERROR).entity(result).build();
    }

    private Response extractSingletonDSIfSucceded(KogitoDMNResult result) {
        if (!result.hasErrors()) {
            return Response.ok(buildResponse(result.getDecisionResults().get(0).getResult())).build();
        } else {
            return buildFailedEvaluationResponse(result);
        }
    }

    private Response buildDMNResultResponse(KogitoDMNResult result) {
        if (!result.hasErrors()) {
            return Response.ok(buildResponse(result)).build();
        } else {
            return buildFailedEvaluationResponse(result);
        }
    }

    private String buildResponse(Object o) {
        try {
            return objectMapper.writeValueAsString(o);
        } catch (com.fasterxml.jackson.core.JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private void enrichResponseHeaders(org.kie.dmn.api.core.DMNResult result) {
        if (!result.hasErrors() && !result.getMessages().isEmpty()) {
            String infoWarns = result.getMessages().stream().map(m -> m.getLevel() + " " + m.getMessage()).collect(java.util.stream.Collectors.joining(", "));
            httpResponse.getOutputHeaders().add(KOGITO_DECISION_INFOWARN_HEADER, infoWarns);
        }
        org.kie.kogito.decision.DecisionExecutionIdUtils.getOptional(result.getContext()).ifPresent(executionId -> httpResponse.getOutputHeaders().add(KOGITO_EXECUTION_ID_HEADER, executionId));
    }

    @POST
    @Path("/dmnresult")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @org.eclipse.microprofile.openapi.annotations.parameters.RequestBody(content = @org.eclipse.microprofile.openapi.annotations.media.Content(mediaType = "application/json", schema = @org.eclipse.microprofile.openapi.annotations.media.Schema(ref = "/dmnDefinitions.json#/definitions/ns1InputSet1")), description = "DMN input")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json", schema = @io.swagger.v3.oas.annotations.media.Schema(ref = "/dmnDefinitions.json#/definitions/ns1InputSet1")), description = "DMN input")
    public Response dmn_dmnresult(java.util.Map<String, Object> variables) {
        org.kie.kogito.decision.DecisionModel decision = application.get(org.kie.kogito.decision.DecisionModels.class).getDecisionModel("https://kiegroup.org/dmn/_1945287C-17E8-4633-A22C-7F9806E9770D", "simple");
        org.kie.dmn.api.core.DMNResult decisionResult = decision.evaluateAll(DMNJSONUtils.ctx(decision, variables));
        enrichResponseHeaders(decisionResult);
        KogitoDMNResult result = new KogitoDMNResult("https://kiegroup.org/dmn/_1945287C-17E8-4633-A22C-7F9806E9770D", "simple", decisionResult);
        return buildDMNResultResponse(result);
    }
}
