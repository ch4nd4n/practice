/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
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
package com.example;

import java.util.Map;
import java.util.HashMap;
import org.kie.kogito.MappableToModel;
import org.kie.kogito.Model;

@org.kie.kogito.codegen.Generated(value = "kogito-codegen", reference = "orders", name = "Orders", hidden = true)
public class OrdersModelInput implements Model, MappableToModel<OrdersModel> {

    @Override
    public Map<String, Object> toMap() {
        Map<String, Object> params = new HashMap<>();
        return params;
    }

    @Override
    public OrdersModelInput fromMap(Map<String, Object> params) {
        return fromMap(null, params);
    }

    @Override
    public void update(Map<String, Object> params) {
        fromMap(params);
    }

    public OrdersModelInput fromMap(String id, Map<String, Object> params) {
        return this;
    }

    @Override()
    public OrdersModel toModel() {
        OrdersModel result = new OrdersModel();
        return result;
    }
}
