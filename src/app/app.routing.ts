import {Routes} from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';
import {AuthGuard} from './auth.guard';
import {UsersComponent} from './components/users/users.component';
import {CreateUpdateComponent} from './components/users/create-update/create-update.component';
import {ViewUserComponent} from './components/users/view-user/view-user.component';
import {RoleGuard} from './role.guard';
import {ProductComponent} from './components/product/product.component';
import {CreateProductComponent} from './components/product/create-product/create-product.component';
import {CategoryComponent} from './components/category/category.component';
import {CreateCategoryComponent} from './components/category/create-category/create-category.component';
import {BrandComponent} from './components/brand/brand.component';
import {CreateBrandComponent} from './components/brand/create-brand/create-brand.component';
import {CurrencyComponent} from './components/currency/currency.component';
import {CreateCurrencyComponent} from './components/currency/create-currency/create-currency.component';
import {UnitsComponent} from './components/units/units.component';
import {CreateUnitComponent} from './components/units/create-unit/create-unit.component';
import {BatchComponent} from './components/batch/batch.component';
import {CreateBatchComponent} from './components/batch/create-batch/create-batch.component';
import {CreateWarehouseComponent} from './components/warehouse/create-warehouse/create-warehouse.component';
import {WarehouseComponent} from './components/warehouse/warehouse.component';
import {FrieghtComponent} from './components/frieght/frieght.component';
import {CreateFrieghtComponent} from './components/frieght/create-frieght/create-frieght.component';
import {CreateInventoryComponent} from './components/inventory/create-inventory/create-inventory.component';
import {InventoryComponent} from './components/inventory/inventory.component';
import {BookerComponent} from './components/booker/booker.component';
import {SupplierComponent} from './components/supplier/supplier.component';
import {CreateSupplierComponent} from './components/supplier/create-supplier/create-supplier.component';
import {CreateBookerComponent} from './components/booker/create-booker/create-booker.component';
import {CreateContainerComponent} from './components/frieght/create-container/create-container.component';

export const AppRoutes: Routes = [

  {
    path: '',
    redirectTo: 'login/default',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/authentication/login/login.module#LoginModule'
  },

  {
    path: '',
    component: AdminComponent,
    children: [
        {
            path: 'container',
            component: CreateContainerComponent,
        },
        {
            path: 'createSupplier',
            component: CreateSupplierComponent,
        },
        {
            path: 'suppliers',
            component: SupplierComponent,
        },
        {
            path: 'createBooker',
            component: CreateBookerComponent,
        },
        {
            path: 'bookers',
            component: BookerComponent,
        },
        {
            path: 'createInventory',
            component: CreateInventoryComponent,
        },
        {
            path: 'inventories',
            component: InventoryComponent,
        },
        {
            path: 'createFrieght',
            component: CreateFrieghtComponent,
        },
        {
            path: 'frieghtes',
            component: FrieghtComponent,
        },
        {
            path: 'createWarehouse',
            component: CreateWarehouseComponent,
        },{
            path: 'warehouses',
            component: WarehouseComponent,
        },{
            path: 'createBatch',
            component: CreateBatchComponent,
        },{
            path: 'batches',
            component: BatchComponent,
        },
        {
            path: 'createUnit',
            component: CreateUnitComponent,
        },{
            path: 'units',
            component: UnitsComponent,
        }, {
            path: 'createCurrency',
            component: CreateCurrencyComponent,
        },{
            path: 'currencies',
            component: CurrencyComponent,
        },{
            path: 'brands',
            component: BrandComponent,
        },{
            path: 'createBrand',
            component: CreateBrandComponent,
        }, {
            path: 'categories',
            component: CategoryComponent,
        },{
            path: 'createCategory',
            component: CreateCategoryComponent,
        },{
            path: 'products',
            component: ProductComponent,
        },{
            path: 'createProduct',
            component: CreateProductComponent,
        },{
          path: 'createUpdate',
          component: CreateUpdateComponent,
        }, {
          path: 'users',
          component: UsersComponent,
            // canActivate: [RoleGuard],
            // data: {
            //     expectedRole: 2
            // },

        }, {
            path: 'viewUser',
            component: ViewUserComponent,

        },{
        path: 'dashboard',
        loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      }, {
        path: 'widget',
        loadChildren: './pages/widget/widget.module#WidgetModule'
      }, {
        path: 'basic',
        loadChildren: './pages/ui-elements/basic/basic.module#BasicModule'
      }, {
        path: 'advance',
        loadChildren: './pages/ui-elements/advance/advance.module#AdvanceModule'
      }, {
        path: 'animations',
        loadChildren: './pages/animations/animations.module#AnimationsModule'
      }, {
        path: 'forms',
        loadChildren: './pages/ui-elements/forms/forms.module#FormsModule'
      }, {
        path: 'bootstrap-table',
        loadChildren: './pages/ui-elements/tables/bootstrap-table/bootstrap-table.module#BootstrapTableModule',
      }, {
        path: 'data-table',
        loadChildren: './pages/ui-elements/tables/data-table/data-table.module#DataTableModule',
      }, {
        path: 'charts',
        loadChildren: './pages/charts/charts.module#ChartsModule',
      }, {
        path: 'map',
      loadChildren: './pages/map/map.module#MapModule',
        }, {
        path: 'maintenance/error',
        loadChildren: './pages/maintenance/error/error.module#ErrorModule'
      }, {
        path: 'maintenance/coming-soon',
        loadChildren: './pages/maintenance/coming-soon/coming-soon.module#ComingSoonModule'
      }, {
        path: 'user',
        loadChildren: './pages/user/user.module#UserModule'
      }, {
        path: 'crm-contact',
        loadChildren: './pages/ui-elements/crm-contact/crm-contact.module#CrmContactModule'
      }, {
        path: 'task',
        loadChildren: './pages/task/task.module#TaskModule'
      }, {
        path: 'editor',
        loadChildren: './pages/ui-elements/editor/editor.module#EditorModule'
      }, {
        path: 'invoice',
        loadChildren: './pages/invoice/invoice.module#InvoiceModule'
      }, {
        path: 'file-upload',
        loadChildren: './pages/ui-elements/file-upload/file-upload.module#FileUploadUIModule'
      }, {
        path: 'change-log',
        loadChildren: './pages/change-log/change-log.module#ChangeLogModule'
      }, {
        path: 'simple-page',
        loadChildren: './pages/simple-page/simple-page.module#SimplePageModule'
      }
    ]
  },


  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: './pages/authentication/authentication.module#AuthenticationModule'
      }, {
        path: 'maintenance/offline-ui',
        loadChildren: './pages/maintenance/offline-ui/offline-ui.module#OfflineUiModule'
      }
    ]
  }
];
