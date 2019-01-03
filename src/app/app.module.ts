import {BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppRoutes} from './app.routing';

import {AppComponent} from './app.component';
import {AdminComponent} from './layout/admin/admin.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BreadcrumbsComponent} from './layout/admin/breadcrumbs/breadcrumbs.component';
import {TitleComponent} from './layout/admin/title/title.component';
import {AuthComponent} from './layout/auth/auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {HttpClientModule, HTTP_INTERCEPTORS,} from '@angular/common/http';

import {AuthGuard} from './auth.guard';
import {UserService} from './services/user.service';
import {ProductService} from './services/product.service';
import {TokenInterceptorService} from './token-interceptor.service';
import {UsersComponent} from './components/users/users.component';
import {CreateUpdateComponent } from './components/users/create-update/create-update.component';
import {ViewUserComponent } from './components/users/view-user/view-user.component';
import {PagerService} from './services/pager.service';
import {HttpModule} from '@angular/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {RoleGuard} from './role.guard';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {ProductComponent } from './components/product/product.component';
import {CreateProductComponent } from './components/product/create-product/create-product.component';
import {CategoryComponent } from './components/category/category.component';
import {CreateCategoryComponent } from './components/category/create-category/create-category.component';
import {CategoryService} from './services/category.service';
import {BrandComponent } from './components/brand/brand.component';
import {CreateBrandComponent } from './components/brand/create-brand/create-brand.component';
import {BrandService} from './services/brand.service';
import {CurrencyComponent } from './components/currency/currency.component';
import {CreateCurrencyComponent } from './components/currency/create-currency/create-currency.component';
import {CurrencyService} from './services/currency.service';
import {UnitsComponent } from './components/units/units.component';
import {BatchComponent } from './components/batch/batch.component';
import {CreateBatchComponent } from './components/batch/create-batch/create-batch.component';
import {CreateUnitComponent } from './components/units/create-unit/create-unit.component';
import {UnitService} from './services/unit.service';
import {BatchService} from './services/batch.service';
import {WarehouseComponent } from './components/warehouse/warehouse.component';
import {CreateWarehouseComponent } from './components/warehouse/create-warehouse/create-warehouse.component';
import {WarehouseService} from './services/warehouse.service';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {FrieghtComponent } from './components/frieght/frieght.component';
import {FrieghtService} from './services/frieght.service';
import {CreateFrieghtComponent } from './components/frieght/create-frieght/create-frieght.component';
import {InventoryComponent } from './components/inventory/inventory.component';
import {CreateInventoryComponent } from './components/inventory/create-inventory/create-inventory.component';
import {InventoryService} from './services/inventory.service';
import {BookerComponent } from './components/booker/booker.component';
import {SupplierComponent } from './components/supplier/supplier.component';
import {BookerService} from './services/booker.service';
import {CreateBookerComponent } from './components/booker/create-booker/create-booker.component';
import {CreateSupplierComponent } from './components/supplier/create-supplier/create-supplier.component';
import {SupplierService} from './services/supplier.service';
import { FilterPipe } from './filter.pipe';
import { CreateContainerComponent } from './components/frieght/create-container/create-container.component';

@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        BreadcrumbsComponent,
        TitleComponent,
        AuthComponent,
        UsersComponent,
        CreateUpdateComponent,
        ViewUserComponent,
        ProductComponent,
        CreateProductComponent,
        CategoryComponent,
        CreateCategoryComponent,
        BrandComponent,
        CreateBrandComponent,
        CurrencyComponent,
        CreateCurrencyComponent,
        UnitsComponent,
        BatchComponent,
        CreateBatchComponent,
        CreateUnitComponent,
        WarehouseComponent,
        CreateWarehouseComponent,
        FrieghtComponent,
        CreateFrieghtComponent,
        InventoryComponent,
        CreateInventoryComponent,
        BookerComponent,
        SupplierComponent,
        CreateBookerComponent,
        CreateSupplierComponent,
        FilterPipe,
        CreateContainerComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRoutes),
        ClickOutsideModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        NgxPaginationModule,
        JwtModule.forRoot({
            config: {
                tokenGetter () {
                    return localStorage.getItem('token');
                },
                whitelistedDomains: ['localhost:3001']
            }
        }),
        ToastModule.forRoot(),

    ],
    providers: [
        AuthService, AuthGuard, UserService,PagerService, RoleGuard,
        JwtHelperService,JwtModule,ProductService,CategoryService,BrandService,
        CurrencyService,BatchService, UnitService, WarehouseService, FrieghtService,
        InventoryService, BookerService, SupplierService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
      }],

    bootstrap: [AppComponent],

})
export class AppModule { }



