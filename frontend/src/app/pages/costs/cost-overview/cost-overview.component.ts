import { Component, OnInit } from '@angular/core';
import {CostService} from '../../../core/services/cost.service';
import {DatePipe} from '@angular/common';
import {CostChart} from '../../../models/cost.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ResizeService} from '../../../core/services/resize.service';

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
  stats: {
    highestGroup: string,
    averageCosts: number,
    averageConsumption: number,
    sumSingle: number,
    sumRepeating: number,
    sumFuel: number
  }
  vin: string;


  constructor(
    public costService: CostService,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    public resize: ResizeService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.vin = params.vin.toUpperCase()
    );

    this.stats = {
      highestGroup: 'nn',
      averageCosts: 0,
      averageConsumption: 0,
      sumSingle: 0,
      sumRepeating: 0,
      sumFuel: 0
    };

    // Init stats
    this.costService.actualized.subscribe(() => {
      this.generateStats().then();
    });


    // Loading Charts
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
    this.costService.updateType = 'single';
    this.router.navigate(['overview/'+ this.vin +'/addCostItem']).then();
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

  /**
   * Loads the statistics for the cost overview
   */
  async generateStats(): Promise<void> {
    const single = this.costService.costs.single;
    const repeat = this.costService.costs.repeating;
    const fuel = this.costService.costs.fuel;

    // Get highest group
    const highSingle = this.costService.getHighestPrice(single);
    const highRepeat = this.costService.getHighestPrice(repeat);
    const highFuel = this.costService.getHighestPrice(fuel);

    (highSingle > highRepeat && highSingle > highFuel)? this.stats.highestGroup = 'Single Costs' : undefined;
    (highRepeat > highSingle && highRepeat > highFuel)? this.stats.highestGroup = 'Repeating Costs' : undefined;
    (highFuel > highRepeat && highFuel > highSingle)? this.stats.highestGroup = 'Fuel Costs' : undefined;

    // Get Sum costs
    this.stats.sumSingle = this.costService.getSumOfCosts(single);
    this.stats.sumRepeating = this.costService.getSumOfCosts(repeat);
    this.stats.sumFuel = this.costService.getSumOfCosts(fuel);

    // Average Cost per month
    this.costService.allCostsPerMonth.subscribe( value => {
      const allCostsPerMonth = value;
      let sum = 0;
      for (const dataSet of allCostsPerMonth) {
        for (const datum of dataSet.data) {
          sum += datum.costs;
        }
      }

      (allCostsPerMonth.length !== 0)?
        this.stats.averageCosts = sum / allCostsPerMonth.length : this.stats.averageCosts = 0;
    });

    // Get average Consumption
    const sumOfConsumption = this.costService.getSumOfConsumption(fuel);
    (fuel.length !== 0)?
      this.stats.averageConsumption = sumOfConsumption / fuel.length  : this.stats.averageConsumption = 0;


  }
}
