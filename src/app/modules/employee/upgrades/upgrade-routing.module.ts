import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintReferralQararsComponent } from './components/print-referral-qarars/print-referral-qarars.component';
import { PrintUpgradeQararsComponent } from './components/print-upgrade-qarars/print-upgrade-qarars.component';
import { ReplaceQararNumbersComponent } from './components/replace-qarar-numbers/replace-qarar-numbers.component';

import { ListTBLShamelUpgradeComponent } from './components/TBLShamelUpgrade/list-tblshamel-upgrade/list-tblshamel-upgrade.component';
import { UpgradePrepareAllComponent } from './components/upgrade-prepare-all/upgrade-prepare-all.component';
import { UpgradePromotionQararsComponent } from './components/upgrade-promotion-qarars/upgrade-promotion-qarars.component';
import { UpgradeComponent } from './upgrade.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'upgrades',
    pathMatch: 'full'
  },


        {
          path: 'upgrades',
          component: UpgradeComponent,
          data:
          {
            title: 'ترفيعات العاملين'
          },
          children:
            [
              {
                path: 'listupgrades', component: ListTBLShamelUpgradeComponent, data:
                {
                  title: 'لائحة الترفيعات'
                },
              },
              {
                path: 'prepareall', component: UpgradePrepareAllComponent, data:
                {
                  title: 'تجهيز ملف الترفيعات'
                }
              },

              {
                path: 'printReferralQarar', component: PrintReferralQararsComponent, data:
                {
                  title: 'طباعة إحالات القرار'
                }
              },

              {
                path: 'printUpgradeQarars', component: PrintUpgradeQararsComponent, data:
                {
                  title: 'طباعة قرارات الترفيع'
                }
              },

              {
                path: 'replaceQararNumbers', component: ReplaceQararNumbersComponent, data:
                {
                  title: 'استبدال أرقام القرار'
                }
              },

              {
                path: 'upgradePromotionQarars', component: UpgradePromotionQararsComponent, data:
                {
                  title: 'تهيئة قرارات الترفيع'
                }
              },
            ]
        }
     




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpgradeRoutingModule { }
