import { style } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'hc-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() screenwith = 0 ;

  getBodyClass(): string{
    let styleClass = '';
    if(this.collapsed && this.screenwith > 768){
      styleClass = 'body-trimmed';
    }else if(this.collapsed && this.screenwith <= 768 && this.screenwith >0){
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
