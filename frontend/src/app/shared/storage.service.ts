import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.create();
  }

  async create() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  public async get(key: string) {
    return  await this._storage?.get(key);
  }
  
  public async remove(key: string) {
    await this._storage?.remove(key);
  }

  public async clear() {
    await this._storage?.clear();
  }

  public async keys() {
    await this._storage?.keys();
  }

  public async length() {
    await this._storage?.length();
  }



}