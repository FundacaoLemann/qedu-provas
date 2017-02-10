import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../../core/shared/connection.service';

@Component({
  selector: 'qp-connection-status',
  templateUrl: './connection-status.component.html',
  styleUrls: ['./connection-status.component.sass']
})
export class ConnectionStatusComponent implements OnInit {
  status: boolean;

  constructor(private connection: ConnectionService) {
  }

  ngOnInit() {
    this.connection
      .startWatch(500)
      .subscribe(status => {
        this.status = status
      });
  }

}
