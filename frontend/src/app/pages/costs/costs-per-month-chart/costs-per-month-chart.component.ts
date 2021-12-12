import {Component, Input, OnInit} from '@angular/core';
import {EChartsOption} from 'echarts';
import {CostService} from '../../../core/services/cost.service';
import {DatePipe} from '@angular/common';
import {AllCostsPerMonth, CostPerMonthBuffer} from '../../../models/cost.model';
import {colors} from '../../../../environments/constants';

@Component({
  selector: 'app-costs-per-month-chart',
  templateUrl: './costs-per-month-chart.component.html',
  styleUrls: ['./costs-per-month-chart.component.less']
})
export class CostsPerMonthChartComponent implements OnInit {

  @Input() type: 'single' | 'repeating' | 'fuel' | 'all';
  display: boolean = false;

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [],
  };

  constructor(
    private costService: CostService,
    public datePipe: DatePipe
  ) { }

  ngOnInit(): void {

    // All costs chart
    if (this.type === 'all') {
      this.costService.allCostsPerMonth.subscribe(result => this.generateAllChart(result));
    } else {
      // Only type per month chart
      this.costService.costPerMonth.subscribe( costPerMonth => {
        console.log(costPerMonth);
        this.generateChart(costPerMonth);
      });
    }
  }

  /**
   * Generates the cost per month chart for the main types (not 'all')
   * @param costPerMonth
   * @private
   */
  private generateChart(costPerMonth: CostPerMonthBuffer): void{
    if (costPerMonth.type === this.type) {
      let months = [];
      let price = [];
      let color: string;

      switch (costPerMonth.type) {
        case 'single':
          color = colors.singleCosts;
          break;
        case 'repeating':
          color = colors.repeatingCosts;
          break;
        case 'fuel':
          color = colors.fuelCosts;
      }

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
              shadowColor: color,
              shadowBlur: 8,
              shadowOffsetY: 8
            },
            color: color
          }
        ]
      };
      costPerMonth.data.length > 0? this.display = true : this.display = false;
    }
  }

  /**
   * Generates the chart for the type all
   * @param data
   * @private
   */
  private generateAllChart(data: AllCostsPerMonth[]): void {
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
        shadowColor: colors.singleCosts,
        shadowBlur: 8,
        shadowOffsetY: 8
      },
      color: colors.singleCosts
    };
    const seriesOptionsRepeating: any = {
      name: 'Repeating Costs',
      data: [],
      type: 'line',
      smooth: true,
      symbolSize: 8,
      lineStyle: {
        width: 2,
        shadowColor: colors.repeatingCosts,
        shadowBlur: 8,
        shadowOffsetY: 8
      },
      color: colors.repeatingCosts
    };
    const seriesOptionsFuel: any = {
      name: 'Fuel Costs',
      data: [],
      type: 'line',
      smooth: true,
      symbolSize: 8,
      lineStyle: {
        width: 2,
        shadowColor: colors.fuelCosts,
        shadowBlur: 8,
        shadowOffsetY: 8
      },
      color: colors.fuelCosts
    };

    // series with 0: single, 1: repeating, 2: fuel
    const series = [seriesOptionsSingle, seriesOptionsRepeating, seriesOptionsFuel];

    // Push data into the right fields
    for (const element of data) {
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
    data.length > 0? this.display = true : this.display = false;

  }

}
