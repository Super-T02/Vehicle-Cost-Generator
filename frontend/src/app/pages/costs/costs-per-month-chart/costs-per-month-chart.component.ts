import {Component, Input, OnInit} from '@angular/core';
import {EChartsOption} from 'echarts';
import {CostService} from '../../../core/services/cost.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-costs-per-month-chart',
  templateUrl: './costs-per-month-chart.component.html',
  styleUrls: ['./costs-per-month-chart.component.less']
})
export class CostsPerMonthChartComponent implements OnInit {

  @Input() type: 'single' | 'repeating' | 'fuel';

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };

  constructor(
    private costService: CostService,
    public datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.costService.costPerMonth.subscribe( costPerMonth => {
      if (costPerMonth.type === this.type) {
        let months = [];
        let price = [];

        for (const costPerMonthElement of costPerMonth.data) {
          months.push(this.datePipe.transform(costPerMonthElement.date, 'MMMM YYYY'));
          price.push(costPerMonthElement.costs);
        }

        this.chartOption = {
          legend: {
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: months,
            nameLocation: 'middle',
            boundaryGap: false,
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} €'
            }
          },
          series: [
            {
              data: price,
              type: 'line',
              smooth: true,
              symbolSize: 8,
              lineStyle: {
                width: 2,
                shadowColor: '#1890FF',
                shadowBlur: 8,
                shadowOffsetY: 8
              },
              color: '#1890FF'
            }
          ]
        };
      }
    });
  }

}