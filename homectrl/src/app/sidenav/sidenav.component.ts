import { Component, Output, EventEmitter, OnInit, HostListener} from '@angular/core';
import { navbarData } from './nav-data';
import { WindowSizeService } from '../services/window-size.service';
import { Subscription } from 'rxjs';
import { animate,keyframes,style,transition,trigger } from '@angular/animations';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'hc-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  animations: [
    trigger('fadeInOut',[
      transition(':enter',[
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave',[
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate',[
      transition(':enter',[
          animate('1000ms',
            keyframes([
              style({transform: 'rotate(0deg)',offset: '0'}),
              style({transform: 'rotate(2turn)',offset: '1'}),
            ])
          )
        ])
    ])

  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  collapsed =false;
  screenWidth=0;
  navData = navbarData;
  private sizeSubscription!: Subscription;

  constructor(private windowSizeService: WindowSizeService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.sizeSubscription = this.windowSizeService.width$.subscribe(width => {
      this.screenWidth = width;
    });
    if(this.screenWidth <= 768){
      this.collapsed =false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  ngOnInit(): void {
    this.sizeSubscription = this.windowSizeService.width$.subscribe(width => {
      this.screenWidth = width;
    });
  }

  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});

  }
  closeSidenav(): void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
