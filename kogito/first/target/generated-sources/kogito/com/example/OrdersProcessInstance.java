package com.example;

public class OrdersProcessInstance extends org.kie.kogito.process.impl.AbstractProcessInstance<OrdersModel> {

    public OrdersProcessInstance(com.example.OrdersProcess process, OrdersModel value, org.kie.api.runtime.process.ProcessRuntime processRuntime) {
        super(process, value, processRuntime);
    }

    public OrdersProcessInstance(com.example.OrdersProcess process, OrdersModel value, java.lang.String businessKey, org.kie.api.runtime.process.ProcessRuntime processRuntime) {
        super(process, value, businessKey, processRuntime);
    }

    public OrdersProcessInstance(com.example.OrdersProcess process, OrdersModel value, org.kie.api.runtime.process.ProcessRuntime processRuntime, org.kie.api.runtime.process.WorkflowProcessInstance wpi) {
        super(process, value, processRuntime, wpi);
    }

    public OrdersProcessInstance(com.example.OrdersProcess process, OrdersModel value, org.kie.api.runtime.process.WorkflowProcessInstance wpi) {
        super(process, value, wpi);
    }

    protected java.util.Map<String, Object> bind(OrdersModel variables) {
        return variables.toMap();
    }

    protected void unbind(OrdersModel variables, java.util.Map<String, Object> vmap) {
        variables.fromMap(this.id(), vmap);
    }
}
