import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';
import { NavService } from '../../shared/components/containers/default-layout/nav.service';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {

  
  navItems: INavData[] = [

    {
      title: true,
      name: 'البطاقة الذاتية'
    },
  
    {
      name: 'البيانات الشخصية',
      url: 'employees/module/employeecards/Cards/manage/employeeinfo',
      iconComponent: { name: 'cil-pencil' }
    }
    ,
  
    {
      name: 'ادخال بطاقة شخصية',
      url: 'employees/module/employeecards/Cards/manage/newemployee',
      iconComponent: { name: 'cil-pencil' }
    },
    {
      name: 'المؤهل العلمي',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/employeecards/Cards/manage/education'
  
    },
    {
      name: 'الدراسات والدورات',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/employeecards/Cards/manage/course'
  
    },
    {
      name: 'المكافئات',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/employeecards/Cards/manage/bonus'
  
    },
    {
      name: 'الإجازات الخاصة',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/employeecards/Cards/manage/scfreeholiday'
  
    },
    {
      name: 'الوضع الوظيفي',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/employeecards/Cards/manage/scjobstate'
  
    },
    {
      name: 'العقوبات',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/employeecards/Cards/manage/punishment'
    },
    {
      name: 'طباعة بطاقة',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/employeecards/Cards/manage/punishment'
    },
    {
      name: 'مراسيم الزيادة',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/employeecards/Cards/manage/incmarsoom'
    },
    {
      name: 'بيانات الخدمة',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/employeecards/Cards/manage/jobservicedata'
    },
    {
      name: 'حذف بطاقة',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/employeecards/Cards/manage/deletecardid'
    },
    {
      name: 'تغيير رقم البطاقة',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/employeecards/Cards/manage/changeid'
    },
    {
      name: 'عرض تشابه الاسماء',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/employeecards/Cards/manage/changeid'
    },
    {
      name: 'بيانات الخدمة',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/employeecards/Cards/manage/jobservicedata'
    },
    {
      name: 'طباعة بطاقة',
      iconComponent: { name: 'cil-pencil' },
      url: 'employees/module/employeecards/Cards/manage/printcard'
    },
    {
      title: true,
      name: 'جداول الترميز'
    },
    {
      name: 'الشهادات',
  
      url: 'employees/module/employeecards/Cards/encoding/certificate',
      iconComponent: { name: 'cil-pencil' }
    },
    {
      name: 'الاختصاص',
  
      url: 'employees/module/employeecards/Cards/encoding/specification',
      iconComponent: { name: 'cil-pencil' }
  
    },
    {
      name: 'الدورات',
  
      url: 'employees/module/employeecards/Cards/encoding/course',
      iconComponent: { name: 'cil-pencil' }
  
    }
  
    , {
      name: 'التقييم',
  
      url: 'employees/module/employeecards/Cards/encoding/rank',
      iconComponent: { name: 'cil-pencil' }
    },
    {
      name: 'المراكز الوظيفية',
  
      url: 'employees/module/employeecards/Cards/encoding/department',
      iconComponent: { name: 'cil-pencil' }
  
    },
    {
      name: 'نوع الوظيفة',
  
      url: 'employees/module/employeecards/Cards/encoding/jobkind',
      iconComponent: { name: 'cil-pencil' }
  
    }
  
    ,
    {
      name: 'اسباب التبدل',
  
      url: 'employees/module/employeecards/Cards/encoding/changereason',
      iconComponent: { name: 'cil-pencil' }
  
    }
  
  
    ,
    {
      name: 'سبب الإجازة الخاصة',
  
      url: 'employees/module/employeecards/Cards/encoding/freeholidayreason',
      iconComponent: { name: 'cil-pencil' }
  
    },
  
  
    {
      name: 'سبب المكافأة',
  
      url: 'employees/module/employeecards/Cards/encoding/bonusreason',
      iconComponent: { name: 'cil-pencil' }
  
    },
  
    {
      name: 'المكافئات',
  
      url: 'employees/module/employeecards/Cards/encoding/bonus',
      iconComponent: { name: 'cil-pencil' }
  
    },
  
    {
      name: 'جدول صفة تذييل الطباعة',
  
      url: 'employees/module/employeecards/Cards/encoding/footerh1',
      iconComponent: { name: 'cil-pencil' }
  
    },
  
    {
      name: 'جدول اسم تذييل الطباعة',
  
      url: 'employees/module/employeecards/Cards/encoding/footerh2',
      iconComponent: { name: 'cil-pencil' }
  
    },
  
    {
      name: 'جدول الصفة الوظيفية',
  
      url: 'employees/module/employeecards/Cards/encoding/jobname',
      iconComponent: { name: 'cil-pencil' }
  
    },
  
  
    {
      name: 'جدول نوع المستند',
  
      url: 'employees/module/employeecards/Cards/encoding/documenttype',
      iconComponent: { name: 'cil-pencil' }
  
    },
  
  
    {
      name: 'العقوبات',
  
      url: 'employees/module/employeecards/Cards/encoding/punishment',
      iconComponent: { name: 'cil-pencil' }
  
    },
  
    {
      name: 'جدول سبب العقوبة',
  
      url: 'employees/module/employeecards/Cards/encoding/punishmentreason',
      iconComponent: { name: 'cil-pencil' }
  
    }
  
  
  
  
  
  
  
  
  
  
  
  ];
  
  

  constructor(private navService:NavService) {
    this.navService.navItems_Subject.next(this.navItems);
  }

  

  ngOnInit(): void {
    

  }

}
