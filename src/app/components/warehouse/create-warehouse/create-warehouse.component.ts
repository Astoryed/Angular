import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {Warehouse} from '../warehouse';
import {WarehouseService} from '../../../services/warehouse.service';
import {ToastsManager} from 'ng2-toastr';



@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.css']
})
export class CreateWarehouseComponent implements OnInit {

    public warehouse:Warehouse;

    cityName = [];

    errorMsg ={warehouseName: '', warehouseCode: '', warehouseLocation:''};

    cities = [];

    constructor(private _router: Router, private warehouseService: WarehouseService,
                public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }


    ngOnInit() {
        this.warehouse = this.warehouseService.getter();

        this.readCity();

        this.cities = ["Abbottabad", "Adezai", "Ali Bandar", "Amir Chah", "Attock", "Ayubia", "Bahawalpur", "Baden", "Bagh",
            "Bahawalnagar", "Burewala", "Banda Daud Shah", "Bannu district|Bannu", "Batagram", "Bazdar", "Bela", "Bellpat",
            "Bhag", "Bhakkar", "Bhalwal", "Bhimber", "Birote", "Buner", "Burj", "Chiniot", "Chachro", "Chagai", "Chah Sandan",
            "Chailianwala", "Chakdara", "Chakku", "Chakwal", "Chaman", "Charsadda", "Chhatr", "Chichawatni", "Chitral", "Dadu",
            "Dera Ghazi Khan", "Dera Ismail Khan", "Dalbandin", "Dargai", "Darya Khan", "Daska", "Dera Bugti", "Dhana Sar", "Digri",
            "Dina City|Dina", "Dinga", "Diwana", "Dokri", "Drosh", "Duki", "Dushi", "Duzab", "Faisalabad", "Fateh Jang",
            "Ghotki", "Gwadar", "Gujranwala", "Gujrat", "Gadra", "Gajar", "Gandava", "Garhi Khairo", "Garruck", "Ghakhar Mandi",
            "Ghanian", "Ghauspur", "Ghazluna", "Girdan", "Gulistan", "Gwash", "Hyderabad", "Hala", "Haripur", "Hab Chauki",
            "Hafizabad", "Hameedabad", "Hangu", "Harnai", "Hasilpur", "Haveli Lakha", "Hinglaj", "Hoshab", "Islamabad", "Islamkot",
            "Ispikan", "Jacobabad", "Jamshoro", "Jhang", "Jhelum", "Jamesabad", "Jampur", "Janghar", "Jati(Mughalbhin)", "Jauharabad",
            "Jhal", "Jhal Jhao", "Jhatpat", "Jhudo", "Jiwani", "Jungshahi", "Karachi", "Kotri", "Kalam", "Kalandi", "Kalat", "Kamalia",
            "Kamararod", "Kamber", "Kamokey", "Kanak", "Kandi", "Kandiaro", "Kanpur","Kapip", "Kappar", "Karak City", "Karodi", "Kashmor",
            "Kasur", "Katuri", "Keti Bandar", "Khairpur", "Khanaspur", "Khanewal", "Kharan", "kharian", "Khokhropur", "Khora",
            "Khushab", "Khuzdar", "Kikki", "Klupro", "Kohan", "Kohat", "Kohistan", "Kohlu", "Korak", "Korangi", "Kot Sarae", "Kotli",
            "Lahore", "Larkana", "Lahri", "Lakki Marwat", "Lasbela", "Latamber", "Layyah", "Leiah", "Liari", "Lodhran", "Loralai",
            "Lower Dir", "Shadan Lund", "Multan", "Mandi Bahauddin", "Mansehra", "Mian Chanu", "Mirpur", "Mardan", "Mach", "Madyan",
            "Malakand", "Mand", "Manguchar", "Mashki Chah", "Maslti", "Mastuj", "Mastung", "Mathi", "Matiari", "Mehar", "Mekhtar", "Merui",
            "Mianwali", "Mianez", "Mirpur Batoro", "Mirpur Khas", "Mirpur Sakro", "Mithi", "Mongora", "Murgha Kibzai", "Muridke",
            "Musa Khel Bazar", "Muzaffar Garh", "Muzaffarabad", "Nawabshah", "Nazimabad", "Nowshera", "Nagar Parkar", "Nagha Kalat",
            "Nal", "Naokot", "Nasirabad", "Nauroz Kalat", "Naushara", "Nur Gamma", "Nushki", "Nuttal", "Okara", "Ormara", "Peshawar",
            "Panjgur","Pasni City", "Paharpur", "Palantuk", "Pendoo", "Piharak", "Pirmahal", "Pishin", "Plandri", "Pokran", "Pounch",
            "Quetta", "Qambar", "Qamruddin Karez", "Qazi Ahmad", "Qila Abdullah", "Qila Ladgasht", "Qila Safed", "Qila Saifullah",
            "Rawalpindi", "Rabwah", "Rahim Yar Khan", "Rajan Pur", "Rakhni", "Ranipur", "Ratodero", "Rawalakot", "Renala Khurd",
            "Robat Thana", "Rodkhan", "Rohri", "Sialkot", "Sadiqabad", "Safdar Abad- (Dhaban Singh)", "Sahiwal", "Saidu Sharif",
            "Saindak", "Sakrand", "Sanjawi", "Sargodha", "Saruna", "Shabaz Kalat", "Shadadkhot", "Shahbandar", "Shahpur", "Shahpur Chakar",
            "Shakargarh", "Shangla", "Sharam Jogizai", "Sheikhupura", "Shikarpur", "Shingar", "Shorap", "Sibi", "Sohawa", "Sonmiani",
            "Sooianwala", "Spezand", "Spintangi", "Sui","Sujawal", "Sukkur", "Suntsar", "Surab", "Swabi", "Swat", "Tando Adam",
            "Tando Bago", "Tangi", "Tank City", "Tar Ahamd Rind", "Thalo", "Thatta", "Tordher", "Tujal", "Tump", "Turbat", "Umarao",
            "Umarkot", "Upper Dir", "Uthal", "Vehari", "Veirwaro", "Vitakri", "Wadh", "Wah Cantt", "Warah", "Washap", "Wasjuk",
            "Wazirabad", "Yakmach", "Zhob", "Other"];

    }

    readCity() {
        this.warehouseService.readCity()
            .subscribe(
                data => {

                    // let sortedList = [];
                    //
                    // let rawData = data['msg'];
                    //
                    // rawData.forEach((cityName) => {
                    //     // if (user.firstName != tokenPayload.firstName && user.userType != "Super Admin") {
                    //     //
                    //     if (cityName.name) {
                    //         sortedList.push(cityName)
                    //     }
                    //     // console.log('outer',user.firstName)
                    //     // console.log('sorted',sortedList)
                    //     for (let key in cityName) {
                    //       console.log('inner',cityName[key].name)
                    //     //     // sortedList = user[key].name
                    //     }
                    // });

                    this.cityName = data['msg'];

                },

                err =>{
                    console.log(err);
                })
    }


    createWarehouse() {
        if (this.warehouse._id == undefined) {
            this.warehouseService.createWarehouse(this.warehouse).subscribe(
                data => {
                    console.log(data);
                    this._router.navigate(['/warehouses']).then(() => {
                        this.toastr.success('Warehouse is created successfully', 'Warehouse Created');
                    });
                },
                err => {
                    console.log(err);
                    if (err.error) {
                        this.errorMsg = JSON.parse(err.error)
                    }
                }
            )
        }else{
            this.warehouseService.updateWarehouse(this.warehouse).subscribe(
                data => {
                    console.log(data);
                    this._router.navigate(['/warehouses']).then(() => {
                        this.toastr.info('Warehouse is updated', 'Warehouse Updated');
                    });
                },
                error => {
                    console.log(error)
                }
            )
        }
    }

}
