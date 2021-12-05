import {Component, Input, OnInit} from '@angular/core';
import {CostService} from '../../../core/services/cost.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SingleCostItem} from '../../../models/cost.model';
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from 'ng-zorro-antd/table';
import {ApiService} from '../../../core/services/api.service';
import {AuthService} from '../../../core/services/auth.service';
import {NzModalService} from 'ng-zorro-antd/modal';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<SingleCostItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<SingleCostItem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-single-costs',
  templateUrl: './single-costs.component.html',
  styleUrls: ['./single-costs.component.less']
})
export class SingleCostsComponent implements OnInit {

  listOfColumns: ColumnItem[] = [
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: SingleCostItem, b: SingleCostItem) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: null,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Price',
      sortOrder: null,
      sortFn: (a: SingleCostItem, b: SingleCostItem) => a.price - b.price,
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: null
    },
    {
      name: 'Mileage',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: SingleCostItem, b: SingleCostItem) => a.km - b.km,
      filterMultiple: null,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Type',
      sortOrder: null,
      sortFn: (a: SingleCostItem, b: SingleCostItem) => a.type.localeCompare(b.type),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Date',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: SingleCostItem, b: SingleCostItem) => a.date.getTime() - b.date.getTime(),
      filterMultiple: null,
      listOfFilter: [],
      filterFn: null
    }
  ];
  expandSet = new Set<string>();
  vin: string;

  constructor(
    public costService: CostService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => this.vin = params.vin.toUpperCase()
    );
  }

  /**
   * Handle expand for table
   * @param id
   * @param checked
   */
  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  /**
   * Redirect to addSingleCost
   */
  addSingleCost() {
    this.costService.updateType = 'single';
    this.router.navigate(['overview/'+ this.vin +'/addCostItem']).then();
  }

  /**
   * Redirect to updateSingleCost
   */
  updateCost(id: string) {
    this.costService.updateType = 'single';
    this.router.navigate(['overview/'+ this.vin +'/updateCostItem/' + id]).then();
  }

  /**
   * Delete CostItem with given id
   * @param id
   */
  deleteCost(id: string) {
    this.modal.confirm({
      nzTitle: 'Delete Cost Item?',
      nzContent: 'Are you sure to delete this Cost Item?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: 'No',
      nzWidth: 550,
      nzStyle: {top: '25%'},
      nzOnOk: () => {
        this.api.deleteSingleCostItem(this.vin, this.auth.username, id).subscribe(
          () => this.costService.loadCosts(this.vin)
        );
      }
    });
  }
}
