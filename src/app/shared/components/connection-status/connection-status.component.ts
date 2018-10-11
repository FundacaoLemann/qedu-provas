import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'qp-connection-status',
  templateUrl: 'connection-status.component.html',
  styleUrls: ['connection-status.component.sass']
})
export class ConnectionStatusComponent implements OnInit {
  status: boolean = null;
  message = '';

  constructor(private connection: ConnectionService) {
  }

  ngOnInit() {
    this.connection.stopWatch();
    this.connection
      .startWatch(30000)
      .subscribe(status => {
        this.status = status;
        this.message = ((status) ? 'COM' : 'SEM') + ' conexão com a internet';
      });
  }

}
