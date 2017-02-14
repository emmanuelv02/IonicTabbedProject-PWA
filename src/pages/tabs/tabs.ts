import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { CreatePage } from '../create/create';
import { ImageUploadPage } from '../imageUpload/imageUpload';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = CreatePage;
  tab3Root: any = ImageUploadPage;
  tab4Root: any = AboutPage;

  constructor() {
  }
}
