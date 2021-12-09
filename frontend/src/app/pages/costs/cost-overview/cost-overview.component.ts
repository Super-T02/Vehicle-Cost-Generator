import { Component, OnInit } from '@angular/core';
import {EChartsOption} from 'echarts';
import {CostService} from '../../../core/services/cost.service';
import {DatePipe} from '@angular/common';
import {CostChart} from '../../../models/cost.model';

@Component({
  selector: 'app-cost-overview',
  templateUrl: './cost-overview.component.html',
  styleUrls: ['./cost-overview.component.less']
})
export class CostOverviewComponent implements OnInit {
  averageConsumption: CostChart = {
    loaded: false,
    options: {
      xAxis: {
        type: 'category',
        data: [],
      },
      yAxis: {
        type: 'value',
      },
      series: [
      ],
    }
  }
  distance: CostChart = {
    loaded: false,
    options: {
      xAxis: {
        type: 'category',
        data: [],
      },
      yAxis: {
        type: 'value',
      },
      series: [
      ],
    }
  }



  constructor(
    private costService: CostService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.costService.actualized.subscribe(value => {
      if(value === 'fuel'){
        this.generateConsumptionChart();
        this.generateDistanceChart();
      }
    });
  }

  /**
   * Redirect to add new cost item
   */
  add(): void {

  }

  /**
   * Generates the consumption chart with als its options
   */
  generateConsumptionChart(): void {
    const {fuel} = this.costService.costs;
    let months = [];
    let consumption = [];

    // Sort
    fuel.sort((a, b) => a.date.getTime() - b.date.getTime());

    // Push important data
    for (const fuelCostItem of fuel) {
      months.push(this.datePipe.transform(fuelCostItem.date, 'MMMM YYYY'));
      consumption.push(fuelCostItem.consumption);
    }

    // Initialize chart
    this.averageConsumption.options = {
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
          formatter: '{value} l/100km'
        }
      },
      series: [
        {
          data: consumption,
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
        }
      ]
    };
    this.averageConsumption.loaded = true;
  }

  /**
   * Generates the distance chart with als its options
   */
  generateDistanceChart(): void {
    const {fuel} = this.costService.costs;
    let months = [];
    let distance = [];

    // sort
    fuel.sort((a, b) => a.date.getTime() - b.date.getTime());

    // Push important data
    for (const fuelCostItem of fuel) {
      months.push(this.datePipe.transform(fuelCostItem.date, 'MMMM YYYY'));
      distance.push(fuelCostItem.km);
    }

    // Initialize chart
    this.distance.options = {
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
          formatter: '{value} km'
        }
      },
      series: [
        {
          data: distance,
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
        }
      ]
    };
    this.distance.loaded = true;
  }
}
