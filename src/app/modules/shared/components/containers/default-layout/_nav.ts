import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [

  {
    name: 'منظومة الشامل',
    url: '/',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  ,
  },
  {
    name: 'الشؤون الإدارية و ادارة الموارد البشرية' ,
    url: '../employees',
    iconComponent: { name: 'cil-pencil' },

  },
 
  {
    name: 'الشؤون المالية' ,
    url: 'finace',
    iconComponent: { name: 'cil-pencil' },
  },
 
  
];
