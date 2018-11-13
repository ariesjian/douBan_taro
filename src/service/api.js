import {stringify} from 'qs';
import request from '../utils/request';
import Config from '../common/config';

export async function getInTheaters(params) {
  return request(`${Config.API_HOST}/movie/in_theaters?${stringify(params)}`);
}

