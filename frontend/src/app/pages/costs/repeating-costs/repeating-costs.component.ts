import { Component, OnInit } from '@angular/core';
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from 'ng-zorro-antd/table';
import {RepeatingCostItem} from '../../../models/cost.model';
import {CostService} from '../../../core/services/cost.service';
import {ActivatedRoute, Router} from '@angular/router';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<RepeatingCostItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<RepeatingCostItem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}


@Component({
  selector: 'app-repeating-costs',
  templateUrl: './repeating-costs.component.html',
  styleUrls: ['./repeating-costs.component.less']
})
export class RepeatingCostsComponent implements OnInit {

  listOfColumns: ColumnItem[] = [
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: RepeatingCostItem, b: RepeatingCostItem) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: null,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Price',
      sortOrder: null,
      sortFn: (a: RepeatingCostItem, b: RepeatingCostItem) => a.price - b.price,
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: null
    },
    {
      name: 'Period',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null, // TODO: sort function
      filterMultiple: null,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Date',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: RepeatingCostItem, b: RepeatingCostItem) => a.date.getTime() - b.date.getTime(),
      filterMultiple: null,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Description',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
      filterMultiple: null,
      listOfFilter: [],
      filterFn: null
    }
  ];

  vin: string;

  constructor(
    public costService: CostService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => this.vin = params.vin.toUpperCase()
    );
  }

  /**
   * Redirect to addRepeatingCost
   */
  addRepeatingCost() {
    this.costService.updateType = 'repeating';
    this.router.navigate(['overview/'+ this.vin +'/addCostItem']).then();
  }

  /**
   * Redirect to updateSingleCost
   */
  updateCost(id: string) {
    this.costService.updateType = 'repeating';
    this.router.navigate(['overview/'+ this.vin +'/updateCostItem/' + id]).then();
  }

}
