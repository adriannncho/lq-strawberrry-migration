package org.lq.internal.domain.sales;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SalesWeek {

    private String weekInitial;
    private String weekFinish;
    private BigDecimal totalDailyWeek;
}
