import {StoreonEvents} from "storeon";

export interface State {
  photoList: Array<Record<string, any>> | null;
}

export interface Events extends StoreonEvents<State> {
  'photos/set': any;
  'photos/like': any;
  'photos/delete': any;
}