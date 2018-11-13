import { MemoryStorage } from "memorystorage";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root"
})
export class StorageService {
  lsFallBack: MemoryStorage;
  supported: boolean;
  constructor() {
    this.lsFallBack = null;
    this.supported = this.validateLS();
    if (!this.supported) this.lsFallBack = new MemoryStorage("fallBack");
  }
  get(lsName) {
    if (this.supported) {
      return sessionStorage.getItem(lsName);
    }
    return this.lsFallBack.getItem(lsName);
  }
  set(lsName, lsValue) {
    if (this.supported) {
      sessionStorage.setItem(lsName, JSON.stringify(lsValue));
      return;
    }
    this.lsFallBack.setItem(lsName, JSON.stringify(lsValue));
  }
  del(lsName) {
    if (this.supported) {
      sessionStorage.removeItem(lsName);
      return;
    }
    this.lsFallBack.removeItem(lsName);
  }
  clear() {
    if (this.supported) {
      sessionStorage.clear();
      return;
    }
    this.lsFallBack.clear();
  }
  validateLS() {
    try {
      sessionStorage.setItem("test", "1");
      sessionStorage.removeItem("test");
      return true;
    } catch (error) {
      return false;
    }
  }
}
export default Storage;
