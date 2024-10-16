package org.padd.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlertObject {
    @JsonProperty
    private String id;

    @JsonProperty
    private String datatype;

    @JsonProperty
    private String value;
}