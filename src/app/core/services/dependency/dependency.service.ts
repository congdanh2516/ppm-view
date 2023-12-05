import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DependencyService {
  constructor(private httpClient: HttpClient) {}

  createDependency(dependency: any) {
    let api = environment.url + 'dependencies';
    return this.httpClient.post(api, dependency);
  }

  getDependencies() {
    let api = environment.url + 'dependencies';
    return this.httpClient.get(api);
  }

  deleteDependencies(depedencyId: any) {
    let api = environment.url + `dependencies/${depedencyId}`;
    return this.httpClient.delete(api);
  }
}
