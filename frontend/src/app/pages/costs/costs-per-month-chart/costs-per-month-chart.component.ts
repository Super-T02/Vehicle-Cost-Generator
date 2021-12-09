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

  @Input() type: 'single' | 'repeating' | 'fuel' | 'all';

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
    ],
  };

  constructor(
    private costService: CostService,
    public datePipe: DatePipe
  ) { }

  ngOnInit(): void {

    // All costs chart
    if (this.type === 'all') {
      this.costService.allCostsPerMonth.subscribe(result => {
        // set up the options
        let months = [];
        const seriesOptionsSingle: any = {
          name: 'Single Costs',
          data: [],
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
        };
        const seriesOptionsRepeating: any = {
          name: 'Repeating Costs',
          data: [],
          type: 'line',
          smooth: true,
          symbolSize: 8,
          lineStyle: {
            width: 2,
            shadowColor: '#FF4D4F',
            shadowBlur: 8,
            shadowOffsetY: 8
          },
          color: '#FF4D4F'
        };
        const seriesOptionsFuel: any = {
          name: 'Fuel Costs',
          data: [],
          type: 'line',
          smooth: true,
          symbolSize: 8,
          lineStyle: {
            width: 2,
            shadowColor: '#FF69B4',
            shadowBlur: 8,
            shadowOffsetY: 8
          },
          color: '#FF69B4'
        };

        // series with 0: single, 1: repeating, 2: fuel
        const series = [seriesOptionsSingle, seriesOptionsRepeating, seriesOptionsFuel];

        // Push data into the right fields
        for (const element of result) {
          months.push(this.datePipe.transform(element.date, 'MMMM YYYY'));
          let pushed = {single: false, repeating: false, fuel: false};
          for (const datum of element.data) {
            switch (datum.type) {
              case 'single':
                series[0].data.push(datum.costs);
                pushed.single = true;
                break;
              case 'repeating':
                series[1].data.push(datum.costs);
                pushed.repeating = true;
                break;
              case 'fuel':
                series[2].data.push(datum.costs);
                pushed.fuel = true;
                break;
            }
          }

          // No data place 0
          !pushed.single? series[0].data.push(0) : undefined;
          !pushed.repeating? series[1].data.push(0) : undefined;
          !pushed.fuel? series[2].data.push(0) : undefined;
        }

        // Final Options
        this.chartOption = {
          legend: {
            data: ['Single Costs', 'Repeating Costs', 'Fuel Costs']
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
          series: series
        };
      });
    } else {
      // Only type per month chart
      this.costService.costPerMonth.subscribe( costPerMonth => {
        if (costPerMonth.type === this.type) {
          let months = [];
          let price = [];

          for (const costPerMonthElement of costPerMonth.data) {
            months.push(this.datePipe.transform(costPerMonthElement.date, 'MMMM YYYY'));
            price.push(costPerMonthElement.costs);
          }

          this.chartOption = {
            legend: {},
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


}
