package com.example;

import org.jbpm.process.core.datatype.impl.type.ObjectDataType;
import org.jbpm.ruleflow.core.RuleFlowProcessFactory;
import org.drools.core.util.KieFunctions;

@javax.enterprise.context.ApplicationScoped()
@javax.inject.Named("orders")
@io.quarkus.runtime.Startup()
public class OrdersProcess extends org.kie.kogito.process.impl.AbstractProcess<com.example.OrdersModel> {

    @javax.inject.Inject()
    public OrdersProcess(org.kie.kogito.app.Application app) {
        super(app, java.util.Arrays.asList());
        activate();
    }

    public OrdersProcess() {
    }

    @Override()
    public com.example.OrdersProcessInstance createInstance(com.example.OrdersModel value) {
        return new com.example.OrdersProcessInstance(this, value, this.createProcessRuntime());
    }

    public com.example.OrdersProcessInstance createInstance(java.lang.String businessKey, com.example.OrdersModel value) {
        return new com.example.OrdersProcessInstance(this, value, businessKey, this.createProcessRuntime());
    }

    @Override()
    public com.example.OrdersModel createModel() {
        return new com.example.OrdersModel();
    }

    public com.example.OrdersProcessInstance createInstance(org.kie.kogito.Model value) {
        return this.createInstance((com.example.OrdersModel) value);
    }

    public com.example.OrdersProcessInstance createInstance(java.lang.String businessKey, org.kie.kogito.Model value) {
        return this.createInstance(businessKey, (com.example.OrdersModel) value);
    }

    public com.example.OrdersProcessInstance createInstance(org.kie.api.runtime.process.WorkflowProcessInstance wpi) {
        return new com.example.OrdersProcessInstance(this, this.createModel(), this.createProcessRuntime(), wpi);
    }

    public com.example.OrdersProcessInstance createReadOnlyInstance(org.kie.api.runtime.process.WorkflowProcessInstance wpi) {
        return new com.example.OrdersProcessInstance(this, this.createModel(), wpi);
    }

    public org.kie.api.definition.process.Process process() {
        RuleFlowProcessFactory factory = RuleFlowProcessFactory.createProcess("orders");
        factory.name("orders");
        factory.packageName("com.example");
        factory.dynamic(false);
        factory.version("1.0");
        factory.visibility("Public");
        factory.metaData("TargetNamespace", "http://www.omg.org/bpmn20");
        org.jbpm.ruleflow.core.factory.EndNodeFactory<?> endNode1 = factory.endNode(1);
        endNode1.name("end");
        endNode1.terminate(false);
        endNode1.metaData("UniqueId", "_743C7FC8-1044-4B79-9319-9EA9551E4C56");
        endNode1.metaData("elementname", "end");
        endNode1.metaData("x", 715);
        endNode1.metaData("width", 56);
        endNode1.metaData("y", 182);
        endNode1.metaData("height", 56);
        endNode1.done();
        org.jbpm.ruleflow.core.factory.WorkItemNodeFactory<?> workItemNode2 = factory.workItemNode(2);
        workItemNode2.name("HelloTask");
        workItemNode2.workName("");
        workItemNode2.done();
        workItemNode2.metaData("UniqueId", "_75F9E3FF-4922-4476-8884-B01FE6B75360");
        workItemNode2.metaData("elementname", "HelloTask");
        workItemNode2.metaData("x", 481);
        workItemNode2.metaData("width", 154);
        workItemNode2.metaData("y", 159);
        workItemNode2.metaData("height", 102);
        org.jbpm.ruleflow.core.factory.StartNodeFactory<?> startNode3 = factory.startNode(3);
        startNode3.name("start");
        startNode3.interrupting(false);
        startNode3.metaData("UniqueId", "_CB05C1BA-1C36-489F-B06F-13C1A592DEDE");
        startNode3.metaData("elementname", "start");
        startNode3.metaData("x", 345);
        startNode3.metaData("width", 56);
        startNode3.metaData("y", 182);
        startNode3.metaData("height", 56);
        startNode3.done();
        factory.connection(2, 1, "_4EBEB92D-FE0A-444F-AF06-413B9AD46EF0");
        factory.connection(3, 2, "_9BC23558-920F-467B-9C7E-A841BE230620");
        factory.validate();
        return factory.getProcess();
    }
}
