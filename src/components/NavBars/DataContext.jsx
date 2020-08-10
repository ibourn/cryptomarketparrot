import { createContext } from 'react';

/**
 * Allows to access general data in all components
 * 
 * coinsInfos = {
 * dictionnary: [
 * "name symbol",...
 * ]
 * list (map):{ id => {
 * paprika_id: ,
 * gecko_id: ,
 * name: ,
 * symbol: ,
 * rank: ,
 * is_new: ,
 * is_active: ,
 * type: ,
 * svg:
 *  },...
 * }
 */
export const DataContext = createContext();
