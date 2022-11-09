import { INavData } from '@coreui/angular';



export const navItems: INavData[] = [

  {
    title: true,
    name: 'الشؤون الإدارية'
  },

  {
    name: 'البطاقة الذاتية',
    url: 'employeecards/manage',
    iconComponent: { name: 'cil-pencil' },
  }
  ,

  {
    name: 'شؤون العاملين',
    url: 'employeeaffairs',
    iconComponent: { name: 'cil-pencil' },
  },
  {
    name: 'الإحصائيات الإدارية',
    iconComponent: { name: 'cil-pencil' },
    url: 'statistics',

  },
  {
    name: 'الترفيعات الإدارية',
    iconComponent: { name: 'cil-pencil' },
    url: 'upgrades',

  },
 
 
 





];
